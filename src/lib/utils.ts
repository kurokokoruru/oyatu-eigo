// lib/utils.ts
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * 日付をフォーマットして表示用文字列に変換
 */
export function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  // 今日の場合
  if (diffDays === 0) {
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 1) return "たった今";
      if (diffMinutes < 60) return `${diffMinutes}分前`;
    }
    return `${diffHours}時間前`;
  }

  // 1週間以内の場合
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }

  // それ以上の場合は日付表示
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
