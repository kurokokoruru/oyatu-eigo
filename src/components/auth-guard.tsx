"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

type AuthGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              サインインが必要です
            </h2>
            <p className="text-gray-600">
              この機能を使用するにはアカウントが必要です
            </p>
            <div className="space-y-2">
              <Link
                href="/auth/signin"
                className="block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
              >
                サインイン
              </Link>
              <Link
                href="/auth/signup"
                className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                新規登録
              </Link>
            </div>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
