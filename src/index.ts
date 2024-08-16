import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { name, version } from "../package.json";
import { noPhysicalProperties } from "./rules/no-phyisical-properties/rule";

const rtlFriendly = {
  meta: { name, version },
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
