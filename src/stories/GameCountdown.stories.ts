import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GameCountdown from "../components/game/countdown";

/**
 * GameCountdownコンポーネントは「ことばクッキー」ゲーム開始前の
 * カウントダウン画面を表示します。
 *
 * - 美しいクッキー背景画像
 * - 「ことばクッキー」タイトル表示
 * - 3.png, 2.png, 1.pngを使ったアニメーションカウントダウン
 * - バウンス + パルス + 輝きエフェクト
 * - カウント完了時のコールバック実行
 */
const meta: Meta<typeof GameCountdown> = {
  title: "Game/GameCountdown",
  component: GameCountdown,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
ことばクッキーゲーム開始前のカウントダウン画面コンポーネントです。

## 特徴
- kotoba-cookie.png背景画像の表示
- 美しいオーバーレイで可読性確保
- 「ことばクッキー」タイトルの表示
- 3.png → 2.png → 1.png のアニメーションカウントダウン
- バウンス、パルス、輝きエフェクトによる魅力的な演出
- カウント完了時のコールバック実行

## アニメーション効果
- **バウンス**: 数字が弾むように表示
- **パルス**: 数字全体が脈動
- **輝きエフェクト**: 背景に黄色の輝き
- **ドロップシャドウ**: 立体感のある影

## 使用例
ゲーム開始前の準備時間として使用され、プレイヤーに心の準備をさせる効果があります。
        `,
      },
    },
  },
  argTypes: {
    onComplete: {
      action: "countdown completed",
      description: "カウントダウン完了時に実行されるコールバック関数",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのカウントダウン表示
 *
 * 3秒間のカウントダウンが実行され、完了時にonCompleteコールバックが呼ばれます。
 */
export const Default: Story = {
  args: {
    onComplete: () => {
      // カウントダウン完了時のアクション
    },
  },
};

/**
 * カウントダウンのアクション確認用
 *
 * onCompleteアクションがStorybookのActionsパネルで確認できます。
 */
export const WithAction: Story = {
  args: {
    onComplete: () => {
      alert("カウントダウン完了！");
    },
  },
  parameters: {
    docs: {
      description: {
        story: "カウントダウン完了時にアラートが表示される例です。",
      },
    },
  },
};

/**
 * 背景画像の表示確認用
 *
 * kotoba-cookie.pngの背景画像が正しく表示されることを確認できます。
 */
export const BackgroundDisplay: Story = {
  args: {
    onComplete: () => {
      // 背景画像表示テスト完了
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
背景画像の表示テスト用ストーリーです。

- kotoba-cookie.png が正しく表示される
- オーバーレイの透明度が適切
- 文字の可読性が確保されている
        `,
      },
    },
  },
};
