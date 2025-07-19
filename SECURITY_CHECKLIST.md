# セキュリティチェックリスト

## ⚠️ 緊急度: 高

### 1. Row Level Security (RLS) 設定の確認が必要

**問題**: `user_scores`テーブルでユーザーが他のユーザーのデータにアクセスできる可能性

**現在のコード**:

```typescript
// これらの関数でRLSが適切に設定されていないと
// 他のユーザーのデータにアクセス可能
getUserBestScore(userId: string)
getUserGameHistory(userId: string)
```

**修正方法**:

1. Supabaseダッシュボードで`user_scores`テーブルのRLSを有効化
2. 適切なRLSポリシーを作成

**必要なSQL**:

```sql
-- RLSを有効化
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のデータのみアクセス可能
CREATE POLICY "Users can only access their own scores" ON user_scores
FOR ALL USING (auth.uid()::text = user_id);
```

## ⚠️ 緊急度: 中

### 2. パスワード強度の改善

**現在**: 6文字以上のみ
**推奨**: より厳格な要件

### 3. CSRFトークンの検討

**現在**: Next.jsの標準保護のみ
**推奨**: 追加のCSRF保護（必要に応じて）

### 4. レート制限の実装

**現在**: 実装なし
**推奨**: サインイン/サインアップの試行回数制限

## ✅ 緊急度: 低

### 5. 本番環境でのconsole.log削除

**現在**: `console.error`が残存
**状況**: 開発用途なので問題なし

### 6. HTTPSリダイレクト

**現在**: Next.js/Vercelが自動処理
**状況**: 本番環境では問題なし

### 7. Content Security Policy (CSP)

**現在**: 未設定
**推奨**: 本格運用時に実装検討
