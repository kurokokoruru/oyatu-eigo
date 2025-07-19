# Supabase設定ガイド

## ユーザーデータの格納場所

### 1. 認証データ (auth.users)

- **場所**: Supabaseの内蔵認証システム
- **アクセス**: ダッシュボード → Authentication → Users
- **データ**: email, id, created_at, email_confirmed_at など

### 2. プロファイルデータ (public.profiles)

- **場所**: カスタムテーブル
- **データ**: display_name, avatar_url など
- **関連**: auth.users と 1:1 関係

### 3. ゲームデータ (public.user_scores)

- **場所**: カスタムテーブル
- **データ**: スコア、正解数、ゲーム時間など
- **関連**: profiles と 1:多 関係

## 環境変数の設定

`.env.local`ファイルに以下の環境変数を設定してください：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 使用方法

### 基本的なクライアント使用

```typescript
import { supabase } from "@/lib/supabase";

// データの取得
const { data, error } = await supabase.from("user_scores").select("*");
```

### ヘルパー関数の使用

```typescript
import {
  saveGameResult,
  getUserBestScore,
  getUserGameHistory,
  getLeaderboard,
} from "@/lib/supabase-helpers";

// ゲーム結果の保存
await saveGameResult({
  user_id: "user123",
  score: 85,
  correct_answers: 9,
  incorrect_answers: 1,
  game_duration: 300,
});

// ベストスコアの取得
const bestScore = await getUserBestScore("user123");

// ゲーム履歴の取得
const history = await getUserGameHistory("user123", 10);

// リーダーボードの取得
const leaderboard = await getLeaderboard(10);
```

## データベース構造

### user_scores テーブル

| カラム名          | 型        | 説明             |
| ----------------- | --------- | ---------------- |
| id                | uuid      | 主キー           |
| user_id           | text      | ユーザーID       |
| score             | integer   | スコア           |
| correct_answers   | integer   | 正解数           |
| incorrect_answers | integer   | 不正解数         |
| game_duration     | integer   | ゲーム時間（秒） |
| created_at        | timestamp | 作成日時         |

## SQL（参考）

```sql
-- user_scoresテーブルを作成
CREATE TABLE user_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  incorrect_answers INTEGER NOT NULL,
  game_duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスを作成
CREATE INDEX idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX idx_user_scores_score ON user_scores(score DESC);
CREATE INDEX idx_user_scores_created_at ON user_scores(created_at DESC);
```
