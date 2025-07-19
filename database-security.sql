-- Supabase Row Level Security (RLS) ポリシー設定
-- セキュリティを確保するためのデータベース設定

-- profilesテーブルのRLS有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- user_scoresテーブルのRLS有効化  
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;

-- profilesテーブル用ポリシー
-- ユーザーは自分のプロファイルのみ閲覧・更新可能
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- user_scoresテーブル用ポリシー
-- ユーザーは自分のスコアのみ閲覧・挿入可能
CREATE POLICY "Users can view own scores" ON user_scores
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scores" ON user_scores
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 公開リーダーボード用ポリシー（トップスコアのみ表示）
CREATE POLICY "Public leaderboard access" ON user_scores
    FOR SELECT USING (
        -- 上位10位のスコアのみ公開（プライバシー保護）
        score >= (
            SELECT score 
            FROM user_scores 
            ORDER BY score DESC 
            LIMIT 1 OFFSET 9
        )
    );

-- インデックス作成（パフォーマンスとセキュリティ向上）
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_score ON user_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 監査用の更新日時自動設定
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- profilesテーブルの自動更新日時設定
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
