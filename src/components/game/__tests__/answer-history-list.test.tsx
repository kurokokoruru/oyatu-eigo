import { answerHistoryAtom } from "@/store/gameAtoms";
import { render, screen } from "@testing-library/react";
import { Provider, useSetAtom } from "jotai";
import { useEffect } from "react";
import { describe, expect, it } from "vitest";
import AnswerHistoryList from "../answer-history-list";

// テスト用の履歴データ
const mockHistory = [
  {
    question: "apple",
    userAnswer: "りんご",
    correctAnswer: "りんご",
    isCorrect: true,
    timestamp: Date.now() - 3000,
  },
  {
    question: "book",
    userAnswer: "ほん",
    correctAnswer: "本",
    isCorrect: false,
    timestamp: Date.now() - 2000,
  },
  {
    question: "cat",
    userAnswer: "猫",
    correctAnswer: "猫",
    isCorrect: true,
    timestamp: Date.now() - 1000,
  },
];

// テスト用のセットアップコンポーネント
function TestWrapper({ children }: { children: React.ReactNode }) {
  const setHistory = useSetAtom(answerHistoryAtom);

  // テストデータをセット
  useEffect(() => {
    setHistory(mockHistory);
  }, [setHistory]);

  return <>{children}</>;
}

describe("AnswerHistoryList", () => {
  it("履歴が空の場合、何も表示されない", () => {
    render(
      <Provider>
        <AnswerHistoryList />
      </Provider>
    );

    expect(screen.queryByText("回答履歴")).not.toBeInTheDocument();
  });

  it("履歴がある場合、問題と回答を表示する", () => {
    render(
      <Provider>
        <TestWrapper>
          <AnswerHistoryList />
        </TestWrapper>
      </Provider>
    );

    expect(screen.getByText("回答履歴")).toBeInTheDocument();
    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("book")).toBeInTheDocument();
    expect(screen.getByText("cat")).toBeInTheDocument();
  });

  it("正解と不正解で異なるスタイルを表示する", () => {
    render(
      <Provider>
        <TestWrapper>
          <AnswerHistoryList />
        </TestWrapper>
      </Provider>
    );

    // 正解のアイテムには ✓ マークがある
    expect(screen.getAllByText("✓")).toHaveLength(2);
    // 不正解のアイテムには ✗ マークがある
    expect(screen.getAllByText("✗")).toHaveLength(1);
  });
});
