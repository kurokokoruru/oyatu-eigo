"use client";

import { UI_TEXTS } from "@/lib/constants";
import Image from "next/image";
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
    <main className="min-h-screen relative">
      {/* 背景画像レイヤー - kotoba-cookie.png */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/kotoba-cookie.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f7e6c7", // フォールバック色
          zIndex: 1,
        }}
      ></div>

      {/* オーバーレイレイヤー */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          zIndex: 2,
          opacity: 0.5, // メインゲーム画面と同じ透明度
        }}
      ></div>

      {/* コンテンツレイヤー */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen"
        style={{ zIndex: 10 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          {UI_TEXTS.GAME_TITLE}
        </h1>

        {/* カウントダウン数字アニメーション */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {countdown > 0 && (
            <div
              key={countdown} // keyでアニメーションを再開始
              className="animate-pulse"
            >
              <div className="relative">
                {/* 背景の輝きエフェクト */}
                <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-50 animate-ping"></div>

                {/* メイン数字画像 */}
                <Image
                  src={`/${countdown}.png`}
                  alt={`${countdown}`}
                  width={160}
                  height={160}
                  className="relative z-10 drop-shadow-2xl transform transition-all duration-500 ease-out animate-bounce"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
