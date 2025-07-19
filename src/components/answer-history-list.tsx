"use client";

import { answerHistoryAtom } from "@/store/gameAtoms";
import { useAtom } from "jotai";

export default function AnswerHistoryList() {
  const [history] = useAtom(answerHistoryAtom);

  const handleGoogleTranslate = (word: string) => {
    // Google翻訳のURLを生成（英語→日本語）
    const translateUrl = `https://translate.google.com/?sl=en&tl=ja&text=${encodeURIComponent(word)}`;
    window.open(translateUrl, "_blank");
  };

  const handleThesaurus = (word: string) => {
    // Merriam-Webster Thesaurus（類義語辞典）のURLを生成
    const thesaurusUrl = `https://www.merriam-webster.com/thesaurus/${encodeURIComponent(word)}`;
    window.open(thesaurusUrl, "_blank");
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">回答履歴</h3>
      <div className="space-y-2">
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
              <span className="font-medium text-gray-800">{item.question}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGoogleTranslate(item.question)}
                  className="text-sm hover:bg-gray-100 p-1 rounded transition-colors"
                  title="Google翻訳で調べる"
                >
                  🇯🇵
                </button>
                <button
                  onClick={() => handleThesaurus(item.question)}
                  className="text-sm hover:bg-gray-100 p-1 rounded transition-colors"
                  title="Merriam-Webster類義語辞典で調べる"
                >
                  🇺🇸
                </button>
                <span
                  className={`text-lg ${item.isCorrect ? "text-green-600" : "text-red-600"}`}
                >
                  {item.isCorrect ? "✓" : "✗"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
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
