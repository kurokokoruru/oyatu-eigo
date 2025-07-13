"use client";

import { useEffect, useState } from "react";
import Question from "@/components/question";
import { generateQuestions } from "@/lib/questions";
import words from "@/data/pre1/extra-words.json";
import { useSetAtom } from "jotai";
import { questionListAtom } from "@/store/gameAtoms";

export default function PlayPage() {
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(true);
  const setQuestions = useSetAtom(questionListAtom);

  useEffect(() => {
    const generated = generateQuestions(words, 10);
    setQuestions(generated);
  }, [setQuestions]);

  useEffect(() => {
    if (!isCounting) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  if (isCounting) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-6xl font-bold text-gray-800">
        {countdown}
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Question />
    </main>
  );
}
