import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import CelebrationAnimation from "./celebration-animation";

const meta: Meta<typeof CelebrationAnimation> = {
  title: "Components/CelebrationAnimation",
  component: CelebrationAnimation,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "game",
      values: [
        { name: "game", value: "#f9fafb" }, // bg-gray-50相当
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#1f2937" },
      ],
    },
    docs: {
      description: {
        component:
          "正解時に表示されるお祝いアニメーション。yatta.pngがジャンプして着地するモーションを表示します。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    show: {
      control: "boolean",
      description: "アニメーションを表示するかどうか",
    },
    duration: {
      control: { type: "number", min: 500, max: 3000, step: 100 },
      description: "アニメーション表示時間（ミリ秒）",
    },
    onComplete: {
      description: "アニメーション完了時のコールバック",
    },
  },
  args: {
    onComplete: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な表示
export const Default: Story = {
  args: {
    show: true,
    duration: 1000,
  },
};

// 非表示状態
export const Hidden: Story = {
  args: {
    show: false,
    duration: 1000,
  },
};

// 長時間表示
export const LongDuration: Story = {
  args: {
    show: true,
    duration: 3000,
  },
};

// 短時間表示
export const ShortDuration: Story = {
  args: {
    show: true,
    duration: 500,
  },
};

// ゲーム風の背景で表示（問題画面での実際の見た目）
export const InGameContext: Story = {
  args: {
    show: true,
    duration: 1000,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
        {/* 模擬的な問題画面 */}
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">「apple」</h1>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <button className="bg-green-400 text-white font-bold py-2 px-4 rounded-xl shadow">
              りんご ✓
            </button>
            <button className="bg-gray-200 text-gray-400 py-2 px-4 rounded-xl shadow">
              みかん
            </button>
            <button className="bg-gray-200 text-gray-400 py-2 px-4 rounded-xl shadow">
              ばなな
            </button>
            <button className="bg-gray-200 text-gray-400 py-2 px-4 rounded-xl shadow">
              ぶどう
            </button>
          </div>
        </div>

        {/* CelebrationAnimationはここでオーバーレイ表示される */}
        <Story />
      </div>
    ),
  ],
};

// アニメーションの動作確認用（自動的にshow/hideを切り替え）
export const AnimationDemo: Story = {
  args: {
    show: true,
    duration: 2000,
  },
  decorators: [
    (Story) => {
      const [show, setShow] = useState(false);

      useEffect(() => {
        const interval = setInterval(() => {
          setShow((prev) => !prev);
        }, 3000);

        return () => clearInterval(interval);
      }, []);

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              {show
                ? "正解！アニメーション表示中"
                : "3秒後にアニメーション再生"}
            </p>
            <Story args={{ show, duration: 2000 }} />
          </div>
        </div>
      );
    },
  ],
};
