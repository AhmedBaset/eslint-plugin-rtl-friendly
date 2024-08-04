import type { ESLint, Linter } from "eslint";
import pkg from "../package.json";
import { noPhysicalProperties } from "./rules/no-phyisical-properties/rule";

const rtlFriendly = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {} as { recommended: Linter.FlatConfig },
  rules: {
    "no-physical-properties": noPhysicalProperties,
  },
} satisfies ESLint.Plugin;

const configs = {
  recommended: {
    name: "Recommended",
    rules: {
      "rtl-friendly/no-physical-properties": "warn",
    },
    plugins: {
      "rtl-friendly": rtlFriendly,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
} satisfies ESLint.Plugin["configs"];

Object.assign(rtlFriendly.configs, configs);

export default rtlFriendly;
