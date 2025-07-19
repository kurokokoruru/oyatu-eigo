"use client";

import { supabase } from "@/lib/supabase";
import { validateNickname } from "@/lib/validation";
import { useState } from "react";

export const useProfileUpdate = (currentNickname?: string) => {
  const [nickname, setNickname] = useState(currentNickname || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    const nicknameValidation = validateNickname(nickname);

    if (!nicknameValidation.isValid) {
      setError(nicknameValidation.error || "バリデーションエラー");
      return false;
    }

    return true;
  };

  const updateProfile = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) {
      return false;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // 現在のユーザーを取得
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("ユーザー情報の取得に失敗しました");
        return false;
      }

      // プロファイルを更新
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          display_name: nickname.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        setError("プロファイルの更新に失敗しました");
        return false;
      }

      setMessage("プロファイルを更新しました");
      return true;
    } catch (_err) {
      setError("更新中にエラーが発生しました");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNickname(currentNickname || "");
    setError("");
    setMessage("");
  };

  return {
    nickname,
    setNickname,
    loading,
    message,
    error,
    updateProfile,
    resetForm,
  };
};
