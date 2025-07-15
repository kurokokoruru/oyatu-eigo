"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import {
  currentQuestionAtom,
  currentQuestionIndexAtom,
  scoreAtom,
  questionListAtom,
  correctAnswersAtom,
  incorrectAnswersAtom,
} from "@/store/gameAtoms";
import Score from "./score";

export default function Question() {
  const [question] = useAtom(currentQuestionAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentQuestionIndexAtom);
  const [questionList] = useAtom(questionListAtom);
  const [, setCorrectAnswers] = useAtom(correctAnswersAtom);
  const [, setIncorrectAnswers] = useAtom(incorrectAnswersAtom);
  const [selected, setSelected] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  if (!question) return <div className="text-center">問題が見つかりません</div>;

  const handleAnswer = (choice: string) => {
    if (isWaiting) return; // 連打防止
    setSelected(choice);
    const correct = choice === question.correctAnswer;
    setIsWaiting(true);
    if (correct) {
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => prev + 1);
      setTimeout(() => {
        goNext();
      }, 1000);
    } else {
      setScore((prev) => prev - 5);
      setIncorrectAnswers((prev) => prev + 1);
      setTimeout(() => {
        goNext();
      }, 3000);
    }
  };

  const goNext = () => {
    setSelected(null);
    setIsWaiting(false);
    if (currentIndex < questionList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 終了処理へ（後で追加）
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 text-center">
      <Score />
      <h2 className="text-2xl font-semibold text-gray-800">
        「{question.question}」
      </h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {question.choices.map((choice, idx) => {
          let btnClass =
            "bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-xl shadow transition";
          if (selected) {
            if (choice === question.correctAnswer) {
              btnClass =
                "bg-green-400 text-white font-bold py-2 px-4 rounded-xl shadow transition";
            } else if (choice === selected) {
              btnClass =
                "bg-red-400 text-white font-bold py-2 px-4 rounded-xl shadow transition";
            } else {
              btnClass =
                "bg-gray-200 text-gray-400 py-2 px-4 rounded-xl shadow transition";
            }
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(choice)}
              className={btnClass}
              disabled={!!selected}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
