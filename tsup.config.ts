import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: [
    "src/index.ts",
    // "src/rules/no-phyisical-properties/rule.ts",
    // "src/configs/recommended.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});
