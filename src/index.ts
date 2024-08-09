import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { noPhysicalProperties } from "./rules/no-phyisical-properties/rule";

var a = 2;

const rtlFriendly = {
  meta: {
    name: "eslint-plugin-rtl-friendly",
    // version: pkg.version,
  },
  configs: {} as { recommended: FlatConfig.Config },
  rules: {
    "no-physical-properties": noPhysicalProperties,
  },
};

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
  } satisfies FlatConfig.Config,
};

Object.assign(rtlFriendly.configs, configs);

export default rtlFriendly;
