"use client";

import { UI_TEXTS } from "@/lib/constants";
import { useEffect, useState } from "react";

type GameCountdownProps = {
  onComplete: () => void;
};

export default function GameCountdown({ onComplete }: GameCountdownProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      // onCompleteを非同期で呼び出してレンダリング中のstate更新を防ぐ
      const timer = setTimeout(() => {
        onComplete();
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onComplete]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">
        {UI_TEXTS.GAME_TITLE}
      </h1>
      <div className="text-6xl font-bold text-gray-800">
        {countdown > 0 ? countdown : ""}
      </div>
    </main>
  );
}
