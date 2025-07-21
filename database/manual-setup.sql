-- 統合テーブル作成SQL（ダッシュボードのSQL エディタで実行）
-- 作成日: 2025年7月20日
-- 概要: おやつ英語アプリのデータベース構造を完全に再現するためのSQL
-- バージョン: v2.0 (ranking機能対応版)
-- 
-- 【構成内容】
-- - profiles: ユーザープロファイル（トリガーで自動作成）
-- - game_scores: ゲームスコア記録（RLS保護、自動ランキング更新）
-- - ranking_cache: ランキングキャッシュ（読み取り専用、システム更新）
-- - RLS: 行レベルセキュリティ完全対応
-- - Triggers: プロファイル自動作成、ランキング自動更新、名前同期

-- 1. 基本テーブルの作成
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(50) CHECK (
    display_name IS NULL OR 
    (LENGTH(TRIM(display_name)) >= 1 AND LENGTH(TRIM(display_name)) <= 50)
  ),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name VARCHAR(50) NOT NULL CHECK (
    LENGTH(TRIM(display_name)) >= 1 AND LENGTH(TRIM(display_name)) <= 50
  ),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 999999),
  correct_answers INTEGER NOT NULL CHECK (correct_answers >= 0),
  incorrect_answers INTEGER NOT NULL CHECK (incorrect_answers >= 0),
  total_answers INTEGER NOT NULL CHECK (total_answers >= 0 AND total_answers = correct_answers + incorrect_answers),
  accuracy_rate NUMERIC(5,2) CHECK (accuracy_rate >= 0 AND accuracy_rate <= 100),
  game_duration INTEGER NOT NULL CHECK (game_duration > 0 AND game_duration <= 300), -- 最大5分
  played_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ranking_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name VARCHAR(50) NOT NULL CHECK (
    LENGTH(TRIM(display_name)) >= 1 AND LENGTH(TRIM(display_name)) <= 50
  ),
  best_score INTEGER NOT NULL CHECK (best_score >= 0),
  best_score_date TIMESTAMPTZ NOT NULL,
  rank_position INTEGER UNIQUE NOT NULL CHECK (rank_position > 0),
  total_games INTEGER DEFAULT 0 CHECK (total_games >= 0),
  average_score NUMERIC(8,2) DEFAULT 0 CHECK (average_score >= 0),
  best_accuracy NUMERIC(5,2) DEFAULT 0 CHECK (best_accuracy >= 0 AND best_accuracy <= 100),
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- 2. インデックス作成
CREATE INDEX IF NOT EXISTS idx_profiles_display_name ON public.profiles(display_name);
CREATE INDEX IF NOT EXISTS idx_game_scores_profile ON public.game_scores(profile_id, played_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_ranking ON public.game_scores(score DESC, played_at);
CREATE INDEX IF NOT EXISTS idx_game_scores_display_name ON public.game_scores(display_name);
CREATE INDEX IF NOT EXISTS idx_ranking_cache_position ON public.ranking_cache(rank_position);
CREATE INDEX IF NOT EXISTS idx_ranking_cache_score ON public.ranking_cache(best_score DESC);

-- 3. RLS有効化
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranking_cache ENABLE ROW LEVEL SECURITY;

-- 4. RLSポリシー作成
-- 既存ポリシーを削除してから再作成
DROP POLICY IF EXISTS "users_can_view_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_can_update_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "users_can_insert_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "everyone_can_view_display_names" ON public.profiles;
DROP POLICY IF EXISTS "users_can_insert_own_scores" ON public.game_scores;
DROP POLICY IF EXISTS "everyone_can_view_scores" ON public.game_scores;
DROP POLICY IF EXISTS "users_can_update_own_scores" ON public.game_scores;
DROP POLICY IF EXISTS "users_can_delete_own_scores" ON public.game_scores;
DROP POLICY IF EXISTS "everyone_can_view_rankings" ON public.ranking_cache;
DROP POLICY IF EXISTS "system_only_can_modify_rankings" ON public.ranking_cache;

-- プロファイルのポリシー
CREATE POLICY "users_can_view_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_can_update_own_profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_can_insert_own_profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "everyone_can_view_display_names" ON public.profiles
  FOR SELECT USING (true);

-- ゲームスコアのポリシー
CREATE POLICY "users_can_insert_own_scores" ON public.game_scores
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "everyone_can_view_scores" ON public.game_scores
  FOR SELECT USING (true);

CREATE POLICY "users_can_update_own_scores" ON public.game_scores
  FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "users_can_delete_own_scores" ON public.game_scores
  FOR DELETE USING (auth.uid() = profile_id);

-- ランキングキャッシュのポリシー
CREATE POLICY "everyone_can_view_rankings" ON public.ranking_cache
  FOR SELECT USING (true);

CREATE POLICY "system_only_can_modify_rankings" ON public.ranking_cache
  FOR ALL USING (false) WITH CHECK (false);

-- 5. 関数とトリガーの作成
-- 新規ユーザー登録時のプロフィール作成関数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
    RETURN NEW;
  END IF;
  
  INSERT INTO public.profiles (id, display_name, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'nickname'), ''),
      SPLIT_PART(NEW.email, '@', 1),
      'ユーザー'
    ),
    NULL,
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- ランキングキャッシュ更新関数（既存データを効率的にクリア）
CREATE OR REPLACE FUNCTION public.update_ranking_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 既存データを効率的にクリア
  TRUNCATE public.ranking_cache RESTART IDENTITY;
  
  INSERT INTO public.ranking_cache (profile_id, display_name, best_score, best_score_date, rank_position, total_games, average_score, best_accuracy)
  SELECT 
    gs.profile_id,
    gs.display_name,
    gs.max_score,
    gs.best_date,
    ROW_NUMBER() OVER (ORDER BY gs.max_score DESC, gs.best_date ASC) as rank_position,
    gs.game_count,
    gs.avg_score,
    gs.max_accuracy
  FROM (
    SELECT 
      profile_id,
      display_name,
      MAX(score) as max_score,
      MAX(accuracy_rate) as max_accuracy,
      ROUND(AVG(score), 2) as avg_score,
      COUNT(*) as game_count,
      MIN(CASE WHEN score = MAX(score) THEN played_at END) as best_date
    FROM public.game_scores
    WHERE display_name IS NOT NULL AND display_name != ''
    GROUP BY profile_id, display_name
  ) gs
  ORDER BY gs.max_score DESC, gs.best_date ASC
  LIMIT 30;
END;
$$;

-- スコア挿入時のランキング更新トリガー関数
CREATE OR REPLACE FUNCTION public.trigger_update_ranking_cache()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM public.update_ranking_cache();
  RETURN NEW;
END;
$$;

-- display_name同期関数
CREATE OR REPLACE FUNCTION public.sync_display_name_to_game_scores()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.game_scores 
  SET display_name = NEW.display_name 
  WHERE profile_id = NEW.id;
  
  PERFORM public.update_ranking_cache();
  
  RETURN NEW;
END;
$$;

-- 6. トリガー作成
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS update_ranking_after_score_insert ON public.game_scores;
CREATE TRIGGER update_ranking_after_score_insert
  AFTER INSERT ON public.game_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_ranking_cache();

DROP TRIGGER IF EXISTS sync_display_name_on_profile_update ON public.profiles;
CREATE TRIGGER sync_display_name_on_profile_update
  AFTER UPDATE OF display_name ON public.profiles
  FOR EACH ROW
  WHEN (OLD.display_name IS DISTINCT FROM NEW.display_name)
  EXECUTE FUNCTION public.sync_display_name_to_game_scores();

-- 7. 初期化とテスト
-- ランキングキャッシュの初期化（既存データがある場合）
SELECT public.update_ranking_cache();

-- 8. 設定完了の確認
-- 以下のクエリで設定が正しく完了したかを確認できます:
/*
-- テーブル存在確認
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'game_scores', 'ranking_cache');

-- RLS有効化確認
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'game_scores', 'ranking_cache');

-- ポリシー確認
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- 関数確認
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('handle_new_user', 'update_ranking_cache', 'trigger_update_ranking_cache', 'sync_display_name_to_game_scores');

-- トリガー確認
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
*/

-- 9. 注意事項
-- このSQLファイルは以下の前提で作成されています:
-- - Supabaseプロジェクトが既に作成済み
-- - auth.usersテーブルが利用可能
-- - 管理者権限でSQL Editorからの実行
-- - 既存データがある場合、ランキングキャッシュは自動更新される
