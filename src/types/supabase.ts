export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      // ユーザープロファイルテーブル
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      // ゲームスコアテーブル（新設計）
      game_scores: {
        Row: {
          id: string;
          profile_id: string;
          display_name: string;
          score: number;
          correct_answers: number;
          incorrect_answers: number;
          total_answers: number;
          accuracy_rate: number;
          game_duration: number;
          played_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          display_name: string;
          score: number;
          correct_answers: number;
          incorrect_answers: number;
          total_answers: number;
          accuracy_rate: number;
          game_duration: number;
          played_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          display_name?: string;
          score?: number;
          correct_answers?: number;
          incorrect_answers?: number;
          total_answers?: number;
          accuracy_rate?: number;
          game_duration?: number;
          played_at?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "game_scores_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      // ランキングキャッシュテーブル
      ranking_cache: {
        Row: {
          id: string;
          profile_id: string;
          display_name: string;
          best_score: number;
          best_score_date: string;
          rank_position: number;
          total_games: number;
          average_score: number;
          best_accuracy: number;
          last_updated: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          display_name: string;
          best_score: number;
          best_score_date: string;
          rank_position: number;
          total_games?: number;
          average_score?: number;
          best_accuracy?: number;
          last_updated?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          display_name?: string;
          best_score?: number;
          best_score_date?: string;
          rank_position?: number;
          total_games?: number;
          average_score?: number;
          best_accuracy?: number;
          last_updated?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ranking_cache_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
