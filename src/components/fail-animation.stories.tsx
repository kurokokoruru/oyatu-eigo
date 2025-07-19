import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import { useEffect, useState } from "react";
import FailAnimation from "./fail-animation";

const meta: Meta<typeof FailAnimation> = {
  title: "Components/FailAnimation",
  component: FailAnimation,
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
          "不正解時に表示されるアニメーション。fail.pngが左右にshakeするモーションを表示します。",
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
      control: { type: "number", min: 1000, max: 5000, step: 100 },
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
    duration: 3000,
  },
};

// 非表示状態
export const Hidden: Story = {
  args: {
    show: false,
    duration: 3000,
  },
};

// 短時間表示
export const ShortDuration: Story = {
  args: {
    show: true,
    duration: 1500,
  },
};

// 長時間表示
export const LongDuration: Story = {
  args: {
    show: true,
    duration: 5000,
  },
};

// ゲーム風の背景で表示（問題画面での実際の見た目）
export const InGameContext: Story = {
  args: {
    show: true,
    duration: 3000,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
        {/* 模擬的な問題画面 */}
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">「apple」</h1>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <button className="bg-gray-200 text-gray-400 py-2 px-4 rounded-xl shadow">
              みかん
            </button>
            <button className="bg-red-400 text-white font-bold py-2 px-4 rounded-xl shadow">
              バナナ ✗
            </button>
            <button className="bg-gray-200 text-gray-400 py-2 px-4 rounded-xl shadow">
              ぶどう
            </button>
            <button className="bg-green-400 text-white font-bold py-2 px-4 rounded-xl shadow opacity-50">
              りんご ✓
            </button>
          </div>
          <p className="text-sm text-gray-600">正解: りんご</p>
        </div>

        {/* FailAnimationはここでオーバーレイ表示される */}
        <Story />
      </div>
    ),
  ],
};

// 正解・不正解の比較表示
export const ComparisonWithSuccess: Story = {
  args: {
    show: true,
    duration: 3000,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
          {/* 不正解側 */}
          <div className="text-center space-y-4 relative">
            <h2 className="text-xl font-semibold text-red-600">不正解時</h2>
            <div className="h-64 bg-white rounded-lg shadow relative">
              <Story />
            </div>
            <p className="text-sm text-gray-600">Shakeアニメーション (3秒間)</p>
          </div>

          {/* 正解側 */}
          <div className="text-center space-y-4 relative">
            <h2 className="text-xl font-semibold text-green-600">正解時</h2>
            <div className="h-64 bg-white rounded-lg shadow relative">
              <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="animate-jump-land">
                  <Image
                    src="/yatta.png"
                    alt="正解！"
                    width={200}
                    height={200}
                    className="drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Jumpアニメーション (1秒間)</p>
          </div>
        </div>
      </div>
    ),
  ],
};

// アニメーションの動作確認用（自動的にshow/hideを切り替え）
export const AnimationDemo: Story = {
  args: {
    show: true,
    duration: 3000,
  },
  decorators: [
    (Story) => {
      const [show, setShow] = useState(false);

      useEffect(() => {
        const interval = setInterval(() => {
          setShow((prev) => !prev);
        }, 4000);

        return () => clearInterval(interval);
      }, []);

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              {show
                ? "不正解...アニメーション表示中"
                : "4秒後にアニメーション再生"}
            </p>
            <Story args={{ show, duration: 3000 }} />
          </div>
        </div>
      );
    },
  ],
};
