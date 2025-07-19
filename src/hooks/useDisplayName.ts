"use client";

import { User } from "@supabase/supabase-js";

type UserProfile = {
  display_name: string | null;
};

/**
 * ユーザーの表示名を取得するカスタムフック
 * @param user 認証ユーザー情報
 * @param profile ユーザープロフィール情報
 * @returns 表示用のユーザー名
 */
export function useDisplayName(user: User | null, profile: UserProfile | null) {
  const getUserDisplayName = (): string => {
    if (profile?.display_name) {
      return profile.display_name;
    }
    if (user?.email) {
      return user.email.split("@")[0]; // メールアドレスの@より前の部分
    }
    return "ユーザー";
  };

  return { getUserDisplayName };
}
