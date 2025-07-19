// app/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function Home() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  const handleStart = () => {
    router.push("/word-quiz");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // ユーザー名の表示ロジック
  const getUserDisplayName = () => {
    if (profile?.display_name) {
      return profile.display_name;
    }
    if (user?.email) {
      return user.email.split("@")[0]; // メールアドレスの@より前の部分
    }
    return "ユーザー";
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-yellow-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">おやつえいご</h1>

      {user ? (
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600 mb-6">
            ようこそ、{getUserDisplayName()}さん！
          </p>
          <div className="space-y-3">
            <Button onClick={handleStart} className="text-lg px-6 py-3 w-full">
              ゲームを始める
            </Button>
            <p className="text-xs text-gray-500">
              スコアが自動的に記録されます
            </p>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700 block w-full"
            >
              サインアウト
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleStart}
              className="text-lg px-6 py-3 w-full bg-green-500 hover:bg-green-600"
            >
              ゲームを始める
            </Button>
            <p className="text-sm text-gray-600">
              ゲストでもプレイ可能！
              <br />
              スコア記録にはアカウントが必要です
            </p>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">アカウントをお持ちの方</p>
            <Link href="/auth/signin">
              <Button variant="outline" className="w-full mb-2">
                サインイン
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">
                新規登録
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
