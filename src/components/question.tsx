"use client";

import { useAtom } from "jotai";
import {
  currentQuestionAtom,
  currentQuestionIndexAtom,
  scoreAtom,
  questionListAtom,
} from "@/store/gameAtoms";
import Score from "./score";

export default function Question() {
  const [question] = useAtom(currentQuestionAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentQuestionIndexAtom);
  const [questionList] = useAtom(questionListAtom);

  if (!question) return <div className="text-center">問題が見つかりません</div>;

  const handleAnswer = (choice: string) => {
    if (choice === question.correctAnswer) {
      setScore((prev) => prev + 10);
    } else {
      setScore((prev) => prev - 5);
    }

    // 次の問題へ（最後ならそのまま）
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
        「{question.question}」の意味は？
      </h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {question.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(choice)}
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-xl shadow transition"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
