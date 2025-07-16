"use client";

import { answerHistoryAtom } from "@/store/gameAtoms";
import { useAtom } from "jotai";

export default function AnswerHistoryList() {
  const [history] = useAtom(answerHistoryAtom);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">回答履歴</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {history.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${
              item.isCorrect
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.question}</span>
              <span
                className={`text-lg ${item.isCorrect ? "text-green-600" : "text-red-600"}`}
              >
                {item.isCorrect ? "✓" : "✗"}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <span>あなたの回答: {item.userAnswer}</span>
              {!item.isCorrect && (
                <span className="block">正解: {item.correctAnswer}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
