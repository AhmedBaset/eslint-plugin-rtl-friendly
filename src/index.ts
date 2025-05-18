import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import pkg from "../package.json" with { type: "json" };
import {
  noPhysicalProperties,
  ruleSettings,
} from "./rules/no-phyisical-properties/rule.js";

const rtlFriendly = {
  meta: { name: pkg.name, version: pkg.version },
  configs: {} as { recommended: FlatConfig.Config },
  rules: {
    "no-physical-properties": noPhysicalProperties,
    // future renaming
    "tw-logical-properties": noPhysicalProperties,
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

export { ruleSettings, rtlFriendly };
