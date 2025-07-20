import { supabase } from "@/lib/supabase";
import {
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
} from "@/lib/validation";
import { useState } from "react";

export const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    // ニックネームバリデーション
    const nicknameValidation = validateNickname(nickname);
    if (!nicknameValidation.isValid) {
      setError(nicknameValidation.error || "バリデーションエラー");
      return false;
    }

    // パスワード確認バリデーション
    const passwordConfirmValidation = validatePasswordConfirmation(
      password,
      confirmPassword
    );
    if (!passwordConfirmValidation.isValid) {
      setError(passwordConfirmValidation.error || "パスワード確認エラー");
      return false;
    }

    // パスワードバリデーション
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error || "パスワードエラー");
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            nickname: nickname.trim(),
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // メール確認後にプロファイルを作成するため、ここでは作成しない
        // 代わりにauth.usersのuser_metadataにニックネームを保存
        setMessage(
          "確認メールを送信しました。メールを確認してアカウントを有効化してください。"
        );
      }
    } catch (_err) {
      setError("サインアップに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setNickname("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
  };

  return {
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    message,
    error,
    handleSignUp,
    resetForm,
  };
};
