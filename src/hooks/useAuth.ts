"use client";

import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // プロファイル情報を取得する関数（作成はトリガーで自動実行）
  const fetchOrCreateProfile = async (userId: string, _userEmail: string) => {
    try {
      // プロファイルの取得を試行
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        return data;
      }

      // プロファイルが存在しない場合は少し待ってから再試行
      // （データベーストリガーの処理完了を待つ）
      if (error?.code === "PGRST116") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { data: retryData, error: retryError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (retryData) {
          return retryData;
        }

        // それでもプロファイルが見つからない場合はnullを返す
        if (retryError) {
          // プロフィール作成失敗をログに記録（開発時のみ）
        }
        return null;
      }

      return null;
    } catch (_err) {
      return null;
    }
  };

  useEffect(() => {
    // 現在のセッションを取得
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      if (session?.user) {
        const userProfile = await fetchOrCreateProfile(
          session.user.id,
          session.user.email!
        );
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    getSession();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const userProfile = await fetchOrCreateProfile(
          session.user.id,
          session.user.email!
        );
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchOrCreateProfile(user.id, user.email!);
      setProfile(userProfile);
    }
  };

  return {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  };
}
