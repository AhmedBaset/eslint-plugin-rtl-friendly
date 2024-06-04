// @ts-check

import { config, configs } from "typescript-eslint";
import js from "@eslint/js"
import globals from "globals"

export default config(
  {
    ignores: ["dist/**/*"],
  },
  {
    languageOptions: {
      globals: globals.node,
    }
  },
  js.configs.recommended,
  ...configs.recommended,
  {
    files: ["scripts/**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-namespace": "off",
    },
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      globals: globals.jest,
    }
  }
)

