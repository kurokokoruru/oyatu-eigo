import { signInRateLimiter } from "@/lib/security";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // レート制限チェック
    if (!signInRateLimiter.isAllowed(email)) {
      const remainingTime = signInRateLimiter.getRemainingTime(email);
      setError(
        `試行回数が上限に達しました。${Math.ceil(remainingTime / 60)}分後に再試行してください。`
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("メールアドレスまたはパスワードが正しくありません");
      } else if (data.user) {
        // URLパラメータからリダイレクト先を取得、デフォルトはword-quiz
        const redirectTo =
          new URLSearchParams(window.location.search).get("redirect") ||
          "/word-quiz";
        router.push(redirectTo);
      }
    } catch (_err) {
      setError("サインインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSignIn,
    resetForm,
  };
};
