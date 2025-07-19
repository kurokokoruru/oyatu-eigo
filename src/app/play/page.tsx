"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PlayRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // word-quizページにリダイレクト
    router.replace("/word-quiz");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">リダイレクト中...</p>
      </div>
    </div>
  );
}
