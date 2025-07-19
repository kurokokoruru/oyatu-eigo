# Vercel + Supabaseデプロイメントガイド

このドキュメントでは、おやつ英語アプリをVercelにデプロイし、Supabaseと連携する手順を説明します。

## 🚀 デプロイメント手順

### 1. Vercelアカウントの準備

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでサインアップ/ログイン
3. ダッシュボードにアクセス

### 2. プロジェクトのデプロイ

#### Option A: GitHubリポジトリから直接デプロイ（推奨）

1. Vercelダッシュボードで「New Project」をクリック
2. GitHubリポジトリ `kurokokoruru/oyatu-eigo` を選択
3. 「Import」をクリック
4. プロジェクト設定を確認：
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Option B: Vercel CLIを使用

```bash
# Vercel CLIをインストール
npm i -g vercel

# プロジェクトディレクトリで実行
cd /path/to/oyatu-eigo
vercel

# 設定に従って進める
# - Set up and deploy?: Y
# - Which scope?: 個人アカウントを選択
# - Link to existing project?: N
# - Project name: oyatu-eigo
# - Directory: ./
```

### 3. 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定します：

#### 必須環境変数

| 変数名                          | 値                                         | 説明                    |
| ------------------------------- | ------------------------------------------ | ----------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://acrgcukdtwnjtiaurrbi.supabase.co` | SupabaseプロジェクトURL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  | Supabase匿名キー        |

#### 設定手順

1. Vercelダッシュボード → プロジェクト選択
2. 「Settings」タブ → 「Environment Variables」
3. 各環境変数を追加：
   - **Name**: 変数名を入力
   - **Value**: 対応する値を入力
   - **Environments**: Production, Preview, Developmentすべてにチェック
4. 「Save」をクリック

### 4. Supabase側の設定

#### 4.1 認証設定の更新

1. [Supabase Dashboard](https://supabase.com/dashboard)にログイン
2. プロジェクトを選択
3. 「Authentication」 → 「Settings」
4. 「Site URL」を更新：
   ```
   https://your-project-name.vercel.app
   ```
5. 「Additional Redirect URLs」に追加：
   ```
   https://your-project-name.vercel.app/auth/callback
   https://your-project-name.vercel.app/auth/signin
   https://your-project-name.vercel.app/auth/signup
   ```

#### 4.2 データベース権限の確認

Row Level Security (RLS) ポリシーが適切に設定されていることを確認：

```sql
-- profilesテーブルのポリシー確認
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- user_scoresテーブルのポリシー確認
SELECT * FROM pg_policies WHERE tablename = 'user_scores';
```

### 5. ドメイン設定（オプション）

#### カスタムドメインを使用する場合

1. Vercelダッシュボード → 「Domains」タブ
2. 「Add」をクリックしてドメインを追加
3. DNS設定でCNAMEレコードを追加：
   ```
   CNAME your-domain.com your-project-name.vercel.app
   ```
4. Supabaseの「Site URL」も新しいドメインに更新

### 6. デプロイメント確認

#### ✅ チェックリスト

- [ ] Vercelでビルドが成功している
- [ ] 環境変数が正しく設定されている
- [ ] Supabaseの認証URLが更新されている
- [ ] アプリが正常に表示される
- [ ] ユーザー登録・ログインが動作する
- [ ] ゲームプレイ・スコア保存が動作する

#### 🔧 トラブルシューティング

**ビルドエラーが発生する場合:**

```bash
# ローカルでビルドテスト
npm run build

# TypeScriptエラーチェック
npm run type-check
```

**認証エラーが発生する場合:**

- Supabaseの「Site URL」と「Redirect URLs」を確認
- ブラウザの開発者ツールでネットワークエラーをチェック
- 環境変数が正しく設定されているか確認

**データベース接続エラーの場合:**

- Supabaseプロジェクトが有効であることを確認
- RLSポリシーが適切に設定されているか確認
- 環境変数のタイポがないか確認

## 🛡️ セキュリティ考慮事項

### 本番環境での追加設定

1. **CORS設定**: Supabaseで本番ドメインのみを許可
2. **Rate Limiting**: Supabaseの認証rate limitingを有効化
3. **HTTPS強制**: Vercelは自動的にHTTPS化されます
4. **環境変数**: 本番環境では絶対に秘密鍵を公開しない

### 監視とログ

1. **Vercel Analytics**: パフォーマンス監視
2. **Supabase Logs**: データベースとAuth監視
3. **Error Tracking**: Sentryなどのエラー追跡ツール（推奨）

## 📝 継続的デプロイメント

GitHubにプッシュすると自動的にVercelでデプロイされます：

- **main**ブランチ → 本番環境デプロイ
- **その他のブランチ** → プレビューデプロイ

## 🔗 有用なリンク

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
