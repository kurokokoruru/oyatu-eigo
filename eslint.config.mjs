// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // 未使用変数を厳しくチェック
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_"
      }],
      
      // 未使用import
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_",
      }],
      
      // コンソールログの警告
      "no-console": "warn",
      
      // debugger文の禁止
      "no-debugger": "error",
      
      // 使っていない式の警告
      "no-unused-expressions": "error",
      
      // 到達できないコードの警告
      "no-unreachable": "error",
      
      // 重複したcase文
      "no-duplicate-case": "error",
      
      // 空のブロック文
      "no-empty": ["error", { "allowEmptyCatch": true }],
      
      // any型の使用を警告
      "@typescript-eslint/no-explicit-any": "warn",
    }
  }
];

export default eslintConfig;
