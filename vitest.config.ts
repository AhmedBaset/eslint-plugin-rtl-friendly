import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: path.resolve(__dirname, "./node_modules/.cache/vitest"),
  test: {
    include: ["src/**/test.ts"]
  },
});
