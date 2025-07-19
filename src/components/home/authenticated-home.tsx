"use client";

import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/lib/constants";
import Link from "next/link";

type AuthenticatedHomeProps = {
  displayName: string;
  onStartGame: () => void;
  onSignOut: () => Promise<void>;
};

/**
 * 認証済みユーザー向けホーム画面コンポーネント
 */
export const AuthenticatedHome = ({
  displayName,
  onStartGame,
  onSignOut,
}: AuthenticatedHomeProps) => {
  return (
    <div className="text-center space-y-4">
      <p className="text-lg text-gray-600 mb-6">
        {UI_TEXTS.WELCOME_MESSAGE(displayName)}
      </p>
      <div className="space-y-3">
        <Button onClick={onStartGame} className="text-lg px-6 py-3 w-full">
          {UI_TEXTS.BUTTONS.START_GAME}
        </Button>
        <p className="text-xs text-gray-500">
          {UI_TEXTS.MESSAGES.SCORE_RECORDING}
        </p>

        {/* 設定リンク */}
        <div className="border-t pt-3 mt-4">
          <Link href="/profile">
            <Button variant="outline" className="w-full mb-2 text-sm">
              ⚙️ プロファイル設定
            </Button>
          </Link>
        </div>

        <button
          onClick={onSignOut}
          className="text-sm text-gray-500 hover:text-gray-700 block w-full"
        >
          {UI_TEXTS.BUTTONS.SIGN_OUT}
        </button>
      </div>
    </div>
  );
};
