import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CelebrationAnimation from "../celebration-animation";

// モックタイマー
vi.useFakeTimers();

describe("CelebrationAnimation", () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it("show=trueの時にyatta画像が表示される", () => {
    render(<CelebrationAnimation show={true} />);

    const image = screen.getByAltText("正解！");
    expect(image).toBeInTheDocument();

    // カスタムアニメーションクラスは親のdiv要素についている
    const animationContainer = image.parentElement;
    expect(animationContainer).toHaveClass("animate-jump-land");
  });

  it("show=falseの時は何も表示されない", () => {
    render(<CelebrationAnimation show={false} />);

    expect(screen.queryByAltText("正解！")).not.toBeInTheDocument();
  });

  it("指定した時間後にonCompleteが呼ばれる", () => {
    const onComplete = vi.fn();

    render(
      <CelebrationAnimation
        show={true}
        onComplete={onComplete}
        duration={1000}
      />
    );

    // 1秒後にonCompleteが呼ばれることを確認
    vi.advanceTimersByTime(1000);
    expect(onComplete).toHaveBeenCalled();
  });

  it("カスタムdurationが正しく動作する", () => {
    const onComplete = vi.fn();

    render(
      <CelebrationAnimation
        show={true}
        onComplete={onComplete}
        duration={2000}
      />
    );

    // 2秒後にonCompleteが呼ばれることを確認
    vi.advanceTimersByTime(2000);
    expect(onComplete).toHaveBeenCalled();
  });

  it("show=falseの時はonCompleteが呼ばれない", () => {
    const onComplete = vi.fn();

    render(
      <CelebrationAnimation
        show={false}
        onComplete={onComplete}
        duration={1000}
      />
    );

    vi.advanceTimersByTime(1000);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
