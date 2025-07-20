export type Profile = {
  id: string; // auth.users.idと同じ
  email?: string;
  displayName?: string; // display_name → displayName
  avatarUrl?: string; // avatar_url → avatarUrl
  createdAt: Date; // created_at → createdAt
  updatedAt: Date; // updated_at → updatedAt
};

export type GameScore = {
  id: string;
  profileId: string; // profile_id → profileId
  displayName: string; // display_name → displayName
  score: number;
  correctAnswers: number; // correct_answers → correctAnswers
  incorrectAnswers: number; // incorrect_answers → incorrectAnswers
  totalAnswers: number; // total_answers → totalAnswers
  accuracyRate: number; // accuracy_rate → accuracyRate
  gameDuration: number; // game_duration → gameDuration
  playedAt: Date; // played_at → playedAt
  createdAt: Date; // created_at → createdAt
};

export type RankingEntry = {
  rank: number;
  displayName: string; // display_name → displayName
  score: number;
  playedAt: Date; // played_at → playedAt
  accuracyRate: number; // accuracy_rate → accuracyRate
  totalAnswers: number; // total_answers → totalAnswers
};

export type UserRankingStats = {
  profile: Profile;
  bestScore: number; // best_score → bestScore
  bestScoreDate: Date; // best_score_date → bestScoreDate
  currentRank: number; // rank_position → currentRank
  totalGames: number; // total_games → totalGames
  averageScore: number; // average_score → averageScore
  bestAccuracy: number; // best_accuracy → bestAccuracy
};

export type RankingPageData = {
  topRankings: RankingEntry[];
  userStats?: UserRankingStats;
  totalPlayers: number;
  lastUpdated: Date;
};
