import { atom } from "jotai";
import { Question } from "@/types/question";

export const scoreAtom = atom(0);

export const currentQuestionIndexAtom = atom(0);

export const timerAtom = atom(300); // 5分（秒単位）

export const isPlayingAtom = atom(false);

export const questionListAtom = atom<Question[]>([]);

// 今の問題だけ取り出すAtom（読み取り専用）
export const currentQuestionAtom = atom((get) => {
  const list = get(questionListAtom);
  const index = get(currentQuestionIndexAtom);
  return list[index] || null;
});
