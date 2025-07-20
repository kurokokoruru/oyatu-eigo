"use client";

import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // プロファイル情報を取得または作成する関数
  const fetchOrCreateProfile = async (userId: string, userEmail: string) => {
    try {
      // まずプロファイルの取得を試行
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        return data;
      }

      // プロファイルが存在しない場合、新規作成
      if (error?.code === "PGRST116") {
        // auth.usersのuser_metadataからニックネームを取得
        const { data: userData } = await supabase.auth.getUser();
        const nickname = userData.user?.user_metadata?.nickname || null;

        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: userId,
              email: userEmail,
              display_name: nickname,
            },
          ])
          .select()
          .single();

        if (createError) {
          // プロファイル作成に失敗した場合はnullを返す
          return null;
        }

        return newProfile;
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
