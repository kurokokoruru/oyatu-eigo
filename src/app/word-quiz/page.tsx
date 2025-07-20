"use client";

import Countdown from "@/components/game/countdown";
import Question from "@/components/game/question";
import Result from "@/components/game/result";
import Timer from "@/components/game/timer";
import { useGameState } from "@/hooks/use-game-state";

export default function WordQuizPage() {
  const {
    isCounting,
    isGameEnded,
    remainingTime,
    score,
    correctAnswers,
    incorrectAnswers,
    GAME_DURATION,
    handleCountdownComplete,
    handleRestart,
    handleGoHome,
  } = useGameState();

  const gameContent = () => {
    if (isCounting) {
      return <Countdown onComplete={handleCountdownComplete} />;
    }

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
            opacity: 0.5, // 背景画像を適度に見せる
          }}
        ></div>

        {/* コンテンツレイヤー */}
        <div
          className="relative flex flex-col items-center justify-center min-h-screen"
          style={{ zIndex: 10 }}
        >
          <Timer remainingTime={remainingTime} />

          {isGameEnded ? (
            <Result
              score={score}
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              gameDuration={GAME_DURATION}
              onRestart={handleRestart}
              onGoHome={handleGoHome}
            />
          ) : (
            <Question />
          )}
        </div>
      </main>
    );
  };

  return gameContent();
}
