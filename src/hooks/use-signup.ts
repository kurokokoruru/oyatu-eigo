import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
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
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
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
    setPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
  };

  return {
    email,
    setEmail,
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
