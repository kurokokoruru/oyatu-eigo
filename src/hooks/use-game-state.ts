import words from "@/data/pre1/extra-words.json";
import { generateQuestions } from "@/lib/questions";
import {
  correctAnswersAtom,
  incorrectAnswersAtom,
  questionListAtom,
  scoreAtom,
} from "@/store/gameAtoms";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const GAME_DURATION = 3 * 60; // 3分 = 180秒

export const useGameState = () => {
  const [isCounting, setIsCounting] = useState(true);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const setQuestions = useSetAtom(questionListAtom);
  const [score] = useAtom(scoreAtom);
  const [correctAnswers] = useAtom(correctAnswersAtom);
  const [incorrectAnswers] = useAtom(incorrectAnswersAtom);

  // 問題生成
  useEffect(() => {
    const generated = generateQuestions(words, 100);
    setQuestions(generated);
  }, [setQuestions]);

  // ゲーム時間管理
  useEffect(() => {
    if (!isGameActive) return;

    const gameTimer = setInterval(() => {
      setGameTime((prev) => {
        if (prev >= GAME_DURATION) {
          clearInterval(gameTimer);
          setIsGameActive(false);
          return GAME_DURATION;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(gameTimer);
  }, [isGameActive]);

  const handleCountdownComplete = () => {
    setIsCounting(false);
    setIsGameActive(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const remainingTime = GAME_DURATION - gameTime;
  const isGameEnded = !isGameActive && gameTime >= GAME_DURATION;

  return {
    isCounting,
    isGameActive,
    isGameEnded,
    gameTime,
    remainingTime,
    score,
    correctAnswers,
    incorrectAnswers,
    GAME_DURATION,
    handleCountdownComplete,
    handleRestart,
    handleGoHome,
  };
};
