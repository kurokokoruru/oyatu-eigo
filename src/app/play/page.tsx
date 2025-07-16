"use client";

import GameCountdown from "@/components/game-countdown";
import GameResult from "@/components/game-result";
import GameTimer from "@/components/game-timer";
import Question from "@/components/question";
import { useGameState } from "@/hooks/use-game-state";

export default function PlayPage() {
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

  if (isCounting) {
    return <GameCountdown onComplete={handleCountdownComplete} />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      <GameTimer remainingTime={remainingTime} />

      {isGameEnded ? (
        <GameResult
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
}
