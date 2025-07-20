import { supabase } from "@/lib/supabase";
import { RankingEntry, RankingPageData } from "@/types/ranking";

/**
 * ランキングデータを取得
 */
export async function getRankingData(): Promise<RankingPageData> {
  try {
    // ランキングキャッシュから取得
    const { data: rankings, error } = await supabase
      .from("ranking_cache")
      .select("*")
      .order("rank_position", { ascending: true })
      .limit(30);

    if (error) {
      throw error;
    }

    // RankingEntry型に変換
    const topRankings: RankingEntry[] =
      rankings?.map((cache) => ({
        rank: cache.rank_position,
        displayName: cache.display_name,
        score: cache.best_score,
        playedAt: new Date(cache.best_score_date),
        accuracyRate: cache.best_accuracy,
        totalAnswers: Math.round(
          cache.total_games > 0 ? cache.best_score / cache.total_games : 0
        ),
      })) || [];

    // 総プレイヤー数を取得
    const { count: totalPlayers } = await supabase
      .from("ranking_cache")
      .select("*", { count: "exact", head: true });

    return {
      topRankings,
      totalPlayers: totalPlayers || 0,
      lastUpdated: new Date(),
    };
  } catch (_error) {
    // エラー時はモックデータを返す
    return {
      topRankings: [],
      totalPlayers: 0,
      lastUpdated: new Date(),
    };
  }
}

/**
 * 新しいゲームスコアを保存
 */
export async function saveGameScore(scoreData: {
  profileId: string;
  displayName: string; // profiles.display_nameの値
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  gameDuration: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const totalAnswers = scoreData.correctAnswers + scoreData.incorrectAnswers;
    const accuracyRate =
      totalAnswers > 0
        ? Math.round((scoreData.correctAnswers / totalAnswers) * 100 * 100) /
          100
        : 0;

    const { error } = await supabase.from("game_scores").insert({
      profile_id: scoreData.profileId,
      display_name: scoreData.displayName,
      score: scoreData.score,
      correct_answers: scoreData.correctAnswers,
      incorrect_answers: scoreData.incorrectAnswers,
      total_answers: totalAnswers,
      accuracy_rate: accuracyRate,
      game_duration: scoreData.gameDuration,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "スコアの保存に失敗しました",
    };
  }
}

/**
 * ユーザーの個人統計を取得
 */
export async function getUserRankingStats(profileId: string): Promise<{
  currentRank: number | null;
  bestScore: number;
  totalGames: number;
  averageScore: number;
}> {
  try {
    // ランキングキャッシュから現在の順位と統計を取得
    const { data: rankData } = await supabase
      .from("ranking_cache")
      .select("rank_position, best_score, total_games, average_score")
      .eq("profile_id", profileId)
      .single();

    if (rankData) {
      return {
        currentRank: rankData.rank_position,
        bestScore: rankData.best_score,
        totalGames: rankData.total_games,
        averageScore: rankData.average_score,
      };
    }

    // キャッシュにない場合は直接計算
    const { data: scores } = await supabase
      .from("game_scores")
      .select("score")
      .eq("profile_id", profileId);

    if (!scores || scores.length === 0) {
      return {
        currentRank: null,
        bestScore: 0,
        totalGames: 0,
        averageScore: 0,
      };
    }

    const bestScore = Math.max(...scores.map((s) => s.score));
    const averageScore =
      scores.reduce((sum, s) => sum + s.score, 0) / scores.length;

    return {
      currentRank: null, // ランキング外
      bestScore,
      totalGames: scores.length,
      averageScore: Math.round(averageScore * 100) / 100,
    };
  } catch {
    return {
      currentRank: null,
      bestScore: 0,
      totalGames: 0,
      averageScore: 0,
    };
  }
}
