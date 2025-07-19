import { supabase } from "./supabase";

// プロファイル関連の関数
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProfile(
  userId: string,
  updates: {
    display_name?: string;
    avatar_url?: string;
  }
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ゲーム結果を保存する関数
export async function saveGameResult(gameResult: {
  user_id: string;
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  game_duration: number;
}) {
  const { data, error } = await supabase
    .from("user_scores")
    .insert([gameResult])
    .select();

  if (error) {
    throw error;
  }

  return data;
}

// ユーザーのベストスコアを取得する関数
export async function getUserBestScore(userId: string) {
  const { data, error } = await supabase
    .from("user_scores")
    .select("*")
    .eq("user_id", userId)
    .order("score", { ascending: false })
    .limit(1);

  if (error) {
    console.error("ベストスコアの取得に失敗しました:", error);
    throw error;
  }

  return data?.[0] || null;
}

// ユーザーのゲーム履歴を取得する関数
export async function getUserGameHistory(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from("user_scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("ゲーム履歴の取得に失敗しました:", error);
    throw error;
  }

  return data || [];
}

// リーダーボードを取得する関数
export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from("user_scores")
    .select("*")
    .order("score", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("リーダーボードの取得に失敗しました:", error);
    throw error;
  }

  return data || [];
}
