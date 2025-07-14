"use client";

import { useAtom } from "jotai";
import { scoreAtom } from "@/store/gameAtoms";

export default function Score() {
  const [score] = useAtom(scoreAtom);
  return <div className="text-lg font-bold text-blue-700">スコア: {score}</div>;
}
