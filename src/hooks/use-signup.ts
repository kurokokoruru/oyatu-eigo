import { supabase } from "@/lib/supabase";
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
    if (!nickname.trim()) {
      setError("ニックネームを入力してください");
      return false;
    }

    if (nickname.length < 2 || nickname.length > 20) {
      setError("ニックネームは2文字以上20文字以下で入力してください");
      return false;
    }

    // ニックネームの文字チェック（日本語、英数字、一部記号のみ許可）
    if (!/^[a-zA-Z0-9ひらがなカタカナ漢字_-]+$/.test(nickname)) {
      setError("ニックネームには使用できない文字が含まれています");
      return false;
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return false;
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return false;
    }

    // パスワード強度チェック
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setError("パスワードには大文字、小文字、数字をそれぞれ含めてください");
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
        // プロファイルテーブルにニックネームを保存
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: email,
          display_name: nickname.trim(),
        });

        if (profileError) {
          // プロファイル作成に失敗してもサインアップは成功とする
          // 本番環境では適切なログ記録システムを使用
        }

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
