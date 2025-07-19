/**
 * バリデーション関数群
 */

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

/**
 * ニックネームのバリデーション
 */
export const validateNickname = (nickname: string): ValidationResult => {
  const trimmed = nickname.trim();

  if (!trimmed) {
    return { isValid: false, error: "ニックネームを入力してください" };
  }

  if (trimmed.length < 2 || trimmed.length > 20) {
    return {
      isValid: false,
      error: "ニックネームは2文字以上20文字以下で入力してください",
    };
  }

  // ニックネームの文字チェック（日本語、英数字、一部記号のみ許可）
  // Unicode文字クラスを使用してひらがな、カタカナ、漢字を正しく判定
  // \u3040-\u309F: ひらがな
  // \u30A0-\u30FF: カタカナ
  // \u4E00-\u9FAF: 漢字（CJK統合漢字）
  if (
    !/^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF_-]+$/.test(trimmed)
  ) {
    return {
      isValid: false,
      error: "ニックネームには使用できない文字が含まれています",
    };
  }

  return { isValid: true };
};

/**
 * パスワードのバリデーション
 */
export const validatePassword = (password: string): ValidationResult => {
  if (password.length < 8) {
    return {
      isValid: false,
      error: "パスワードは8文字以上で入力してください",
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return {
      isValid: false,
      error: "パスワードには大文字、小文字、数字をそれぞれ含めてください",
    };
  }

  return { isValid: true };
};

/**
 * パスワード確認のバリデーション
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return { isValid: false, error: "パスワードが一致しません" };
  }
  return { isValid: true };
};
