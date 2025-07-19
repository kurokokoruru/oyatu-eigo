# セキュリティチェックリスト

## ✅ 実装済みのセキュリティ対策

### 認証・認可

- [x] Supabase Auth使用（業界標準のセキュリティ）
- [x] パスワード強度チェック（8文字以上、大文字・小文字・数字）
- [x] パスワード確認機能
- [x] レート制限（15分間で5回まで）
- [x] ログイン試行回数制限
- [x] セッション管理（Supabase自動処理）

### データ保護

- [x] Row Level Security (RLS) ポリシー
- [x] 型安全なデータベーススキーマ
- [x] 環境変数による設定管理
- [x] HTTPS通信（Vercel自動対応）

### クライアントサイドセキュリティ

- [x] HTMLエスケープ関数実装
- [x] 入力値サニタイゼーション
- [x] XSS対策（React自動エスケープ + 追加関数）
- [x] セキュリティヘッダー設定

### セキュリティヘッダー

- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy（不要な権限無効化）
- [x] X-XSS-Protection: 1; mode=block
- [x] Strict-Transport-Security
- [x] Content-Security-Policy

## ⚠️ 改善推奨項目

### 高優先度

- [ ] `.env.local`のGitトラッキング除外確認
- [ ] 本番環境での環境変数設定
- [ ] Supabase RLSポリシーの詳細確認

### 中優先度

- [ ] エラーログの監視システム導入
- [ ] セキュリティ監査ツール導入（例：npm audit）
- [ ] 依存関係の脆弱性定期チェック
- [ ] ブルートフォース攻撃対策の強化

### 低優先度

- [ ] ペネトレーションテスト実施
- [ ] セキュリティヘッダースキャン
- [ ] OWASP Top 10準拠チェック

## 🔐 本番デプロイメント前の必須チェック

### Vercel設定

- [ ] 環境変数が正しく設定されている
- [ ] 本番用ドメインでSupabase設定更新
- [ ] HTTPS強制設定確認

### Supabase設定

- [ ] Site URLが本番ドメインに設定済み
- [ ] Redirect URLsが適切に設定済み
- [ ] RLSポリシーが有効
- [ ] データベースアクセス権限が最小限

### セキュリティテスト

- [ ] 認証フローの動作確認
- [ ] 認可の動作確認（他人のデータアクセス不可）
- [ ] レート制限の動作確認
- [ ] エラーハンドリングの確認

## 🚨 緊急時対応

### インシデント発生時

1. 該当するSupabaseプロジェクトの一時停止
2. Vercelデプロイメントの一時停止
3. ログ確認とインシデント分析
4. 必要に応じてパスワードリセット要求

### 連絡先

- Supabase Dashboard: https://supabase.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repository: https://github.com/kurokokoruru/oyatu-eigo

## 📊 定期メンテナンス

### 月次

- [ ] 依存関係のアップデート確認
- [ ] セキュリティパッチ適用
- [ ] アクセスログ確認

### 四半期

- [ ] パスワードポリシー見直し
- [ ] レート制限設定見直し
- [ ] セキュリティ監査実施

## 🔗 参考資料

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [Supabase Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Vercel Security](https://vercel.com/docs/security)
