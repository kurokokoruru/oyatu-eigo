// app/page.tsx
"use client";

import { AuthenticatedHome, GuestHome, LoadingScreen } from "@/components/home";
import { useAuth } from "@/hooks/useAuth";
import { useDisplayName } from "@/hooks/useDisplayName";
import { UI_TEXTS } from "@/lib/constants";
import { useRouter } from "next/navigation";

/**
 * ホームページコンポーネント
 * ユーザーの認証状態に応じて適切なUIを表示
 */
export default function Home() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const { getUserDisplayName } = useDisplayName(user, profile);

  const handleStart = () => {
    router.push(UI_TEXTS.ROUTES.WORD_QUIZ);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {UI_TEXTS.APP_TITLE}
      </h1>

      {user ? (
        <AuthenticatedHome
          displayName={getUserDisplayName()}
          onStartGame={handleStart}
          onSignOut={handleSignOut}
        />
      ) : (
        <GuestHome onStartGame={handleStart} />
      )}
    </main>
  );
}
