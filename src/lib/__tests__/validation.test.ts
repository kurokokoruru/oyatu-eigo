import { describe, expect, it } from "vitest";
import {
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
} from "../validation";

describe("validateNickname", () => {
  describe("有効なニックネーム", () => {
    it("英数字のみのニックネームは有効", () => {
      const result = validateNickname("user123");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("ひらがなのみのニックネームは有効", () => {
      const result = validateNickname("たろう");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("カタカナのみのニックネームは有効", () => {
      const result = validateNickname("タロウ");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("漢字のみのニックネームは有効", () => {
      const result = validateNickname("太郎");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("混合文字のニックネームは有効", () => {
      const result = validateNickname("田中太郎123");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("アンダースコアを含むニックネームは有効", () => {
      const result = validateNickname("user_name");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("ハイフンを含むニックネームは有効", () => {
      const result = validateNickname("user-name");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("2文字のニックネームは有効", () => {
      const result = validateNickname("ab");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("20文字のニックネームは有効", () => {
      const result = validateNickname("a".repeat(20));
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe("無効なニックネーム", () => {
    it("空文字は無効", () => {
      const result = validateNickname("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ニックネームを入力してください");
    });

    it("空白のみは無効", () => {
      const result = validateNickname("   ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ニックネームを入力してください");
    });

    it("1文字は無効", () => {
      const result = validateNickname("a");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームは2文字以上20文字以下で入力してください"
      );
    });

    it("21文字は無効", () => {
      const result = validateNickname("a".repeat(21));
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームは2文字以上20文字以下で入力してください"
      );
    });

    it("記号を含むニックネームは無効", () => {
      const result = validateNickname("user@name");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームには使用できない文字が含まれています"
      );
    });

    it("スペースを含むニックネームは無効", () => {
      const result = validateNickname("user name");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームには使用できない文字が含まれています"
      );
    });

    it("特殊文字を含むニックネームは無効", () => {
      const result = validateNickname("user!name");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームには使用できない文字が含まれています"
      );
    });

    it("絵文字を含むニックネームは無効", () => {
      const result = validateNickname("user😀");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームには使用できない文字が含まれています"
      );
    });
  });

  describe("エッジケース", () => {
    it("前後の空白は自動的にトリミングされる", () => {
      const result = validateNickname("  user  ");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("トリミング後に1文字になる場合は無効", () => {
      const result = validateNickname("  a  ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "ニックネームは2文字以上20文字以下で入力してください"
      );
    });

    it("トリミング後に空文字になる場合は無効", () => {
      const result = validateNickname("    ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ニックネームを入力してください");
    });
  });
});

describe("validatePassword", () => {
  describe("有効なパスワード", () => {
    it("大文字・小文字・数字を含む8文字のパスワードは有効", () => {
      const result = validatePassword("Password1");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("記号を含む複雑なパスワードは有効", () => {
      const result = validatePassword("MyPassword123!");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("長いパスワードは有効", () => {
      const result = validatePassword("VeryLongPassword123456");
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe("無効なパスワード", () => {
    it("7文字以下は無効", () => {
      const result = validatePassword("Pass1");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("パスワードは8文字以上で入力してください");
    });

    it("大文字がない場合は無効", () => {
      const result = validatePassword("password123");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "パスワードには大文字、小文字、数字をそれぞれ含めてください"
      );
    });

    it("小文字がない場合は無効", () => {
      const result = validatePassword("PASSWORD123");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "パスワードには大文字、小文字、数字をそれぞれ含めてください"
      );
    });

    it("数字がない場合は無効", () => {
      const result = validatePassword("Password");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "パスワードには大文字、小文字、数字をそれぞれ含めてください"
      );
    });
  });
});

describe("validatePasswordConfirmation", () => {
  it("パスワードが一致する場合は有効", () => {
    const result = validatePasswordConfirmation("Password123", "Password123");
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("パスワードが一致しない場合は無効", () => {
    const result = validatePasswordConfirmation("Password123", "Password456");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("パスワードが一致しません");
  });

  it("空文字の場合も一致判定される", () => {
    const result = validatePasswordConfirmation("", "");
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});
