import { describe, expect, it } from "vitest";
import { recommended } from "./recommended.js";

describe("recommended", () => {
  it("should export recommended", () => {
    expect(recommended).toMatchInlineSnapshot(`
      {
        "rules": {
          "rtl-friendly/no-physical-properties": "warn",
        },
      }
    `);
  });
});
