"use client";

import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/lib/constants";
import Link from "next/link";

type GuestHomeProps = {
  onStartGame: () => void;
};

/**
 * ゲストユーザー向けホーム画面コンポーネント
 */
export const GuestHome = ({ onStartGame }: GuestHomeProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-3 mb-6">
        <Button
          onClick={onStartGame}
          className="text-lg px-6 py-3 w-full bg-green-500 hover:bg-green-600"
        >
          {UI_TEXTS.BUTTONS.START_GAME}
        </Button>
        <p className="text-sm text-gray-600">
          {UI_TEXTS.MESSAGES.GUEST_PLAY}
          <br />
          {UI_TEXTS.MESSAGES.ACCOUNT_REQUIRED}
        </p>
      </div>
      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3">
          {UI_TEXTS.MESSAGES.EXISTING_ACCOUNT}
        </p>
        <Link href={UI_TEXTS.ROUTES.SIGNIN}>
          <Button variant="outline" className="w-full mb-2">
            {UI_TEXTS.BUTTONS.SIGN_IN}
          </Button>
        </Link>
        <Link href={UI_TEXTS.ROUTES.SIGNUP}>
          <Button variant="outline" className="w-full">
            {UI_TEXTS.BUTTONS.SIGN_UP}
          </Button>
        </Link>
      </div>
    </div>
  );
};
