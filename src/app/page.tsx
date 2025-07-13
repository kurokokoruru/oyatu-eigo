// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/play");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">おやつえいご</h1>
      <Button onClick={handleStart} className="text-lg px-6 py-3">
        スタート
      </Button>
    </main>
  );
}
