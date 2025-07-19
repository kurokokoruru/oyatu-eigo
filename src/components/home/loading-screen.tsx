"use client";

import { UI_TEXTS } from "@/lib/constants";

/**
 * ローディング画面コンポーネント
 */
export const LoadingScreen = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-600">{UI_TEXTS.APP_TITLE}を読み込み中...</p>
      </div>
    </main>
  );
};
