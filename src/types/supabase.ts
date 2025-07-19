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
          email: string | null;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      // ゲームスコアテーブル
      user_scores: {
        Row: {
          id: string;
          user_id: string;
          score: number;
          correct_answers: number;
          incorrect_answers: number;
          game_duration: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          score: number;
          correct_answers: number;
          incorrect_answers: number;
          game_duration: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          score?: number;
          correct_answers?: number;
          incorrect_answers?: number;
          game_duration?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_scores_user_id_fkey";
            columns: ["user_id"];
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
