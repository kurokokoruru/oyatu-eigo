"use client";

import Image from "next/image";
import { useEffect } from "react";

type CelebrationAnimationProps = {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
};

export default function CelebrationAnimation({
  show,
  onComplete,
  duration = 1000,
}: CelebrationAnimationProps) {
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
      <div className="animate-jump-land">
        <Image
          src="/yatta.png"
          alt="正解！"
          width={200}
          height={200}
          className="drop-shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
