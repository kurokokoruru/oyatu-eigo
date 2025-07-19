"use client";

import { LoadingScreen } from "@/components/home";
import { ProfileUpdateForm } from "@/components/profile/profile-update-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UI_TEXTS } from "@/lib/constants";
import { useRouter } from "next/navigation";

/**
 * プロファイル設定ページ
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleUpdateSuccess = () => {
    // プロファイル更新成功時に少し待ってからホームに戻る
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // 未認証の場合はホームにリダイレクト
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <div className="container mx-auto max-w-2xl">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {UI_TEXTS.APP_TITLE} - 設定
          </h1>
          <Button
            variant="outline"
            onClick={handleBackToHome}
            className="text-sm"
          >
            ← ホームに戻る
          </Button>
        </div>

        {/* ユーザー情報表示 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            現在の情報
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">メールアドレス:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">現在のニックネーム:</span>{" "}
              {profile?.display_name || "未設定"}
            </p>
            <p>
              <span className="font-medium">登録日:</span>{" "}
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString("ja-JP")
                : "不明"}
            </p>
          </div>
        </div>

        {/* プロファイル更新フォーム */}
        <ProfileUpdateForm
          currentNickname={profile?.display_name || ""}
          onSuccess={handleUpdateSuccess}
        />
      </div>
    </main>
  );
}
