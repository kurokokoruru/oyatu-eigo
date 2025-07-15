"use client";

import { useEffect, useState } from "react";
import Question from "@/components/question";
import { generateQuestions } from "@/lib/questions";
import words from "@/data/pre1/extra-words.json";
import { useAtom, useSetAtom } from "jotai";
import {
  questionListAtom,
  scoreAtom,
  correctAnswersAtom,
  incorrectAnswersAtom,
} from "@/store/gameAtoms";

export default function PlayPage() {
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(true);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const setQuestions = useSetAtom(questionListAtom);
  const [score] = useAtom(scoreAtom);
  const [correctAnswers] = useAtom(correctAnswersAtom);
  const [incorrectAnswers] = useAtom(incorrectAnswersAtom);

  const GAME_DURATION = 5 * 60; // 5分 = 300秒

  useEffect(() => {
    const generated = generateQuestions(words, 100);
    setQuestions(generated);
  }, [setQuestions]);

  useEffect(() => {
    if (!isCounting) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsCounting(false);
          setIsGameActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  // ゲーム時間管理
  useEffect(() => {
    if (!isGameActive) return;

    const gameTimer = setInterval(() => {
      setGameTime((prev) => {
        if (prev >= GAME_DURATION) {
          clearInterval(gameTimer);
          setIsGameActive(false);
          // ゲーム終了処理をここに追加可能
          return GAME_DURATION;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(gameTimer);
  }, [isGameActive, GAME_DURATION]);

  // 時間を分:秒形式でフォーマット
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 残り時間を計算
  const remainingTime = GAME_DURATION - gameTime;

  if (isCounting) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-6xl font-bold text-gray-800">
        {countdown}
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      {/* 経過時間表示 */}
      <div className="absolute top-4 right-4 bg-gray-100 px-4 py-2 rounded-lg shadow-md">
        <div className="text-sm text-gray-600">残り時間</div>
        <div
          className={`text-lg font-bold ${remainingTime <= 60 ? "text-red-500" : "text-gray-800"}`}
        >
          {formatTime(remainingTime)}
        </div>
      </div>

      {/* ゲーム終了時の表示 */}
      {!isGameActive && gameTime >= GAME_DURATION ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">時間終了！</h1>

          {/* スコア表示 */}
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-500 mb-2">{score}</div>
            <div className="text-lg text-gray-600">スコア</div>
          </div>

          {/* 詳細統計 */}
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between items-center">
              <span>解答した問題数:</span>
              <span className="font-semibold">
                {correctAnswers + incorrectAnswers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>正解数:</span>
              <span className="font-semibold text-green-600">
                {correctAnswers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>不正解数:</span>
              <span className="font-semibold text-red-600">
                {incorrectAnswers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>正解率:</span>
              <span className="font-semibold">
                {correctAnswers + incorrectAnswers > 0
                  ? Math.round(
                      (correctAnswers / (correctAnswers + incorrectAnswers)) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>平均解答時間:</span>
              <span className="font-semibold">
                {correctAnswers + incorrectAnswers > 0
                  ? Math.round(
                      GAME_DURATION / (correctAnswers + incorrectAnswers)
                    )
                  : 0}
                秒
              </span>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              もう一度プレイ
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              ホームに戻る
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">お疲れ様でした！</p>
        </div>
      ) : (
        <Question />
      )}
    </main>
  );
}
