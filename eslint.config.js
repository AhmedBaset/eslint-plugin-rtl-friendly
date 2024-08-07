// @ts-check

import js from "@eslint/js";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import { config, configs } from "typescript-eslint";

import rtlFriendly from "./dist/index.js";

export default config(
  {
    ignores: ["dist/**/*"],
  },
  eslintPlugin.configs["flat/recommended"],
  js.configs.recommended,
  ...configs.recommended,
  {
    files: ["scripts/**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.{tsx,jsx}"],
    ...rtlFriendly.configs.recommended,
  }
);
