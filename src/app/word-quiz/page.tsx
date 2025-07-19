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
      <main className="flex flex-col items-center justify-center min-h-screen bg-white relative">
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
      </main>
    );
  };

  return gameContent();
}
