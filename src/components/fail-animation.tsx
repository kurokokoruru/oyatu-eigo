"use client";

import Image from "next/image";
import { useEffect } from "react";

type FailAnimationProps = {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
};

export default function FailAnimation({
  show,
  onComplete,
  duration = 3000,
}: FailAnimationProps) {
  // useEffectでタイマーを適切に管理
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);

      // クリーンアップ関数でタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [show, onComplete, duration]);

  if (!show) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-fail-shake">
        <Image
          src="/fail.png"
          alt="不正解..."
          width={200}
          height={200}
          className="drop-shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
