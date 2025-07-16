"use client";

import { useEffect, useState } from "react";

type GameCountdownProps = {
  onComplete: () => void;
};

export default function GameCountdown({ onComplete }: GameCountdownProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-6xl font-bold text-gray-800">
      {countdown}
    </main>
  );
}
