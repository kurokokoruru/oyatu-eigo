import "@testing-library/jest-dom";

// Vitestのグローバル設定
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});

// jest-domのマッチャーをVitestに追加
Object.assign(expect, {});
