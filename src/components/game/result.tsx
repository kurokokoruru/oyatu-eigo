"use client";

import { useAuth } from "@/hooks/useAuth";
import { saveGameScore } from "@/lib/ranking-api";
import { useEffect, useState } from "react";
import AnswerHistoryList from "./answer-history-list";

type GameResultProps = {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  gameDuration: number;
  onRestart: () => void;
  onGoHome: () => void;
};

export default function GameResult({
  score,
  correctAnswers,
  incorrectAnswers,
  gameDuration,
  onRestart,
  onGoHome,
}: GameResultProps) {
  const { user } = useAuth();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const totalAnswers = correctAnswers + incorrectAnswers;
  const accuracyRate =
    totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const averageTime =
    totalAnswers > 0 ? Math.round(gameDuration / totalAnswers) : 0;

  // 認証ユーザーのスコア保存
  useEffect(() => {
    const saveScore = async () => {
      if (!user) return; // 認証していない場合はスキップ

      // idleとsavingの場合は保存しない
      if (saveStatus === "saving" || saveStatus === "saved") return;

      setSaveStatus("saving");
      try {
        const result = await saveGameScore({
          profileId: user.id,
          displayName:
            user.user_metadata?.nickname ||
            user.email?.split("@")[0] ||
            "ユーザー",
          score,
          correctAnswers,
          incorrectAnswers,
          gameDuration,
        });

        if (result.success) {
          setSaveStatus("saved");
        } else {
          setSaveStatus("error");
        }
      } catch (_error) {
        setSaveStatus("error");
      }
    };

    saveScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, score, correctAnswers, incorrectAnswers, gameDuration]);

  return (
    <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">時間終了！</h1>

      {/* スコア表示 */}
      <div className="mb-6">
        <div className="text-6xl font-bold text-blue-500 mb-2">{score}</div>
        <div className="text-lg text-gray-600">スコア</div>

        {/* 保存状態表示 */}
        {user ? (
          <div className="mt-2 text-sm">
            {saveStatus === "saving" && (
              <span className="text-yellow-600">スコア保存中...</span>
            )}
            {saveStatus === "saved" && (
              <span className="text-green-600">✓ スコアを保存しました</span>
            )}
            {saveStatus === "error" && (
              <span className="text-red-600">
                ⚠ スコアの保存に失敗しました
              </span>
            )}
          </div>
        ) : (
          <div className="mt-2 text-sm text-gray-500">
            <p>スコアを記録するには</p>
            <a href="/auth/signin" className="text-yellow-600 hover:underline">
              サインイン
            </a>
            {" または "}
            <a href="/auth/signup" className="text-yellow-600 hover:underline">
              新規登録
            </a>
          </div>
        )}
      </div>

      {/* 詳細統計 */}
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between items-center">
          <span>解答した問題数:</span>
          <span className="font-semibold">{totalAnswers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>正解数:</span>
          <span className="font-semibold text-green-600">{correctAnswers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>不正解数:</span>
          <span className="font-semibold text-red-600">{incorrectAnswers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>正解率:</span>
          <span className="font-semibold">{accuracyRate}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span>平均解答時間:</span>
          <span className="font-semibold">{averageTime}秒</span>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="mt-8 space-y-3">
        <button
          onClick={onRestart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          もう一度プレイ
        </button>
        <button
          onClick={onGoHome}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ホームに戻る
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">お疲れ様でした！</p>

      {/* 回答履歴 */}
      <AnswerHistoryList />
    </div>
  );
}
