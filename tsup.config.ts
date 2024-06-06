import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  splitting: false,
  clean: true,
  dts: true,
  format: ["esm"],
});
