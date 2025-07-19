import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignUpForm } from "./signup-form";

const meta: Meta<typeof SignUpForm> = {
  title: "Components/Auth/SignUpForm",
  component: SignUpForm,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "yellow", value: "#fef3c7" },
        { name: "dark", value: "#1f2937" },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
        <div className="max-w-md w-full space-y-8 p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">おやつ英語</h1>
            <h2 className="mt-6 text-xl font-semibold text-gray-600">
              新規登録
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              アカウントを作成して英語学習を始めましょう
            </p>
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "基本的なサインアップフォームの表示",
      },
    },
  },
};

export const WithDarkBackground: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "ダークモードでの表示",
      },
    },
  },
};

export const Compact: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
        <div className="max-w-sm w-full">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "コンパクトサイズでの表示",
      },
    },
  },
};

export const WithCustomBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="max-w-md w-full space-y-8 p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">おやつ英語</h1>
            <h2 className="mt-6 text-xl font-semibold text-gray-600">
              新規登録
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              アカウントを作成して英語学習を始めましょう
            </p>
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "カスタム背景グラデーションでの表示",
      },
    },
  },
};
