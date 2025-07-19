import { render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import { describe, expect, it, vi } from "vitest";
import GameResult from "../result";

describe("GameResult", () => {
  const mockProps = {
    score: 50,
    correctAnswers: 7,
    incorrectAnswers: 3,
    gameDuration: 300,
    onRestart: vi.fn(),
    onGoHome: vi.fn(),
  };

  it("スコアを表示する", () => {
    render(
      <Provider>
        <GameResult {...mockProps} />
      </Provider>
    );

    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("スコア")).toBeInTheDocument();
  });

  it("正解数と不正解数を表示する", () => {
    render(
      <Provider>
        <GameResult {...mockProps} />
      </Provider>
    );

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("正解率を正しく計算して表示する", () => {
    render(
      <Provider>
        <GameResult {...mockProps} />
      </Provider>
    );

    // 7/(7+3) * 100 = 70%
    expect(screen.getByText("70%")).toBeInTheDocument();
  });
});
