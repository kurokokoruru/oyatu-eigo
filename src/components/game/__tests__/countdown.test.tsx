import { act, render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GameCountdown from "../countdown";

// モックタイマー
vi.useFakeTimers();

describe("GameCountdown", () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it("初期値として3を表示する", () => {
    render(
      <Provider>
        <GameCountdown onComplete={vi.fn()} />
      </Provider>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("1秒後に2を表示する", async () => {
    const onComplete = vi.fn();
    render(
      <Provider>
        <GameCountdown onComplete={onComplete} />
      </Provider>
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("3秒後にonCompleteが呼ばれる", () => {
    const onComplete = vi.fn();
    render(
      <Provider>
        <GameCountdown onComplete={onComplete} />
      </Provider>
    );

    // 各ステップを個別に進める
    act(() => vi.advanceTimersByTime(1000)); // 3 -> 2
    act(() => vi.advanceTimersByTime(1000)); // 2 -> 1
    act(() => vi.advanceTimersByTime(1000)); // 1 -> 0
    act(() => vi.runAllTimers()); // 0になった後のsetTimeoutも実行

    expect(onComplete).toHaveBeenCalled();
  });
});
