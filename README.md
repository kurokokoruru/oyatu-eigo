This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

最低限の機能とは

- スタートボタンを押す
- ３秒カウントダウンが入り問題画面が表示される
- 問題画面には英単語が１つ表示され、その日本語訳を４択から選択する問題が表示される
- 正解すると 10 点加算、不正解だと 5 点減点。
- 答えると次から次と新しい問題に切り替わる
- ５分間のタイマーがあり、５分経つと終了。
- 合計点を表示
- リトライボタンを表示してクリックすると再度開始する。

```
/app
  /layout.tsx        ← 共通レイアウト（ヘッダー・フッター）
  /page.tsx          ← トップページ（おやつえいご＋スタートボタン）
  /play
    /page.tsx        ← プレイ画面（カウントダウン＋問題出題）
  /result
    /page.tsx        ← 結果画面（スコア・リトライ）
/components
  /Countdown.tsx     ← カウントダウンコンポーネント
  /Question.tsx      ← 問題コンポーネント
  /ChoiceButton.tsx  ← 4択ボタンコンポーネント
  /ScoreBoard.tsx    ← スコア・タイマー表示
/ui
  /Button.tsx        ← 共通ボタンUI（shadcn/uiなどベースに）
/lib
  /questions.ts      ← 問題データ、API通信など
  /timer.ts          ← タイマーのユーティリティ
/store
  /gameStore.ts      ← ZustandやuseContextでのゲーム状態管理
/public
  /images            ← 画像など（必要なら）
/styles
  /globals.css
```

Question コンポーネントの作成？

状態管理（スコア・問題・タイマー）設計？

タイマー UI（5 分カウントダウン）追加？
