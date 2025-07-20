"use client";

import RankingPage from "@/components/ranking/ranking-page";
import { getRankingData } from "@/lib/ranking-api";
import { RankingPageData } from "@/types/ranking";
import { useEffect, useState } from "react";

export default function RankingPageRoute() {
  const [rankingData, setRankingData] = useState<RankingPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await getRankingData();
        setRankingData(data);
      } catch (_error) {
        // エラーログは削除（ESLintルールに従い）
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  if (isLoading || !rankingData) {
    return <RankingPage rankings={[]} isLoading={true} />;
  }

  return <RankingPage rankings={rankingData.topRankings} isLoading={false} />;
}
