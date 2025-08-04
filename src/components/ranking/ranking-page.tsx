"use client";

import { UI_TEXTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { RankingEntry } from "@/types/ranking";

type RankingPageProps = {
  rankings: RankingEntry[];
  isLoading?: boolean;
};

export default function RankingPage({
  rankings,
  isLoading = false,
}: RankingPageProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">ランキングを読み込み中...</p>
        </div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank.toString();
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200";
      default:
        return "bg-white border-gray-200";
    }
  };

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
          backgroundColor: "#f7e6c7",
          zIndex: 1,
        }}
      ></div>

      {/* オーバーレイレイヤー */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          zIndex: 2,
          opacity: 0.5,
        }}
      ></div>

      {/* コンテンツレイヤー */}
      <div className="relative min-h-screen py-8" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4 max-w-4xl">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {UI_TEXTS.GAME_TITLE} ランキング
            </h1>
            <p className="text-gray-600">トップ30の最高スコア</p>
          </div>

          {/* ランキングリスト */}
          <div className="space-y-2">
            {rankings.length > 0 ? (
              rankings.map((entry) => (
                <div
                  key={`${entry.rank}-${entry.displayName}`}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getRankStyle(
                    entry.rank
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    {/* 順位とユーザー名 */}
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold w-12 text-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-gray-800">
                          {entry.displayName}
                        </div>
                        <div className="text-sm text-gray-600">
                          正解率: {entry.accuracyRate}% (ゲーム数:{" "}
                          {entry.totalGames})
                        </div>
                      </div>
                    </div>

                    {/* スコアと日付 */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(entry.playedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  まだランキングデータがありません
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  ゲームをプレイしてランキングに挑戦しよう！
                </p>
              </div>
            )}
          </div>

          {/* フッター */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              戻る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
