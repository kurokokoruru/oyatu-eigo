import { act, render, screen } from "@testing-library/react";
import { Provider } from "jotai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GameCountdown from "../game-countdown";

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

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onComplete).toHaveBeenCalled();
  });
});
