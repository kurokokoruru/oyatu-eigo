import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FailAnimation from "../fail";

// モックタイマー
vi.useFakeTimers();

describe("FailAnimation", () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it("show=trueの時にfail画像が表示される", () => {
    render(<FailAnimation show={true} />);

    const image = screen.getByAltText("不正解...");
    expect(image).toBeInTheDocument();

    // カスタムアニメーションクラスは親のdiv要素についている
    const animationContainer = image.parentElement;
    expect(animationContainer).toHaveClass("animate-fail-shake");
  });

  it("show=falseの時は何も表示されない", () => {
    render(<FailAnimation show={false} />);

    expect(screen.queryByAltText("不正解...")).not.toBeInTheDocument();
  });

  it("指定した時間後にonCompleteが呼ばれる", () => {
    const onComplete = vi.fn();

    render(
      <FailAnimation show={true} onComplete={onComplete} duration={3000} />
    );

    // 3秒後にonCompleteが呼ばれることを確認
    vi.advanceTimersByTime(3000);
    expect(onComplete).toHaveBeenCalled();
  });

  it("カスタムdurationが正しく動作する", () => {
    const onComplete = vi.fn();

    render(
      <FailAnimation show={true} onComplete={onComplete} duration={2000} />
    );

    // 2秒後にonCompleteが呼ばれることを確認
    vi.advanceTimersByTime(2000);
    expect(onComplete).toHaveBeenCalled();
  });

  it("show=falseの時はonCompleteが呼ばれない", () => {
    const onComplete = vi.fn();

    render(
      <FailAnimation show={false} onComplete={onComplete} duration={3000} />
    );

    vi.advanceTimersByTime(3000);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("デフォルトのdurationは3000msである", () => {
    const onComplete = vi.fn();

    render(<FailAnimation show={true} onComplete={onComplete} />);

    // デフォルト3秒後にonCompleteが呼ばれることを確認
    vi.advanceTimersByTime(3000);
    expect(onComplete).toHaveBeenCalled();
  });
});
