/**
 * セキュリティ関連のユーティリティ関数
 */

/**
 * HTMLエスケープ関数
 * XSS攻撃を防ぐためのサニタイゼーション
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * SQLインジェクション対策用のサニタイゼーション
 * （Supabaseでは基本的に不要だが、追加の安全対策として）
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/['";\\-]/g, "") // 危険な文字を除去
    .trim()
    .slice(0, 1000); // 長すぎる入力を制限
}

/**
 * パスワード強度チェック関数
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("8文字以上で入力してください");
  }

  if (password.length > 128) {
    errors.push("パスワードは128文字以下で入力してください");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("大文字を含めてください");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("小文字を含めてください");
  }

  if (!/\d/.test(password)) {
    errors.push("数字を含めてください");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("特殊文字（!@#$%^&*()など）を含めると更に安全です");
  }

  // 辞書攻撃対策：一般的な弱いパスワードパターンをチェック
  const weakPatterns = [
    /^(password|123456|qwerty|admin|login|welcome)/i,
    /^(.)\1{7,}$/, // 同じ文字の繰り返し
    /^(012|123|234|345|456|567|678|789)/, // 連続数字
  ];

  if (weakPatterns.some((pattern) => pattern.test(password))) {
    errors.push("より複雑なパスワードを設定してください");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * メールアドレスのバリデーション
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * レート制限のためのシンプルなストレージ
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    // 15分間で5回まで
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // 古い試行記録を削除
    const recentAttempts = attempts.filter(
      (time) => now - time < this.windowMs
    );

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    // 新しい試行を記録
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);

    return true;
  }

  getRemainingTime(key: string): number {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    const recentAttempts = attempts.filter(
      (time) => now - time < this.windowMs
    );

    if (recentAttempts.length < this.maxAttempts) {
      return 0;
    }

    const oldestAttempt = Math.min(...recentAttempts);
    return Math.ceil((oldestAttempt + this.windowMs - now) / 1000);
  }
}

export const signInRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 15分間で5回まで
