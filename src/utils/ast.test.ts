// the ast.ts exports are tested in `test.ts` but this file is only to 100% coverage

import { describe, expect, it } from "vitest";
import { extractTokensFromNode } from "./ast.js";
import type { Context } from "../rules/no-phyisical-properties/rule.js";
import type { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

describe("ast", () => {
  it("non JSXAttribute", () => {
    expect(
      extractTokensFromNode(
        {
          type: "VariableDeclaration" as AST_NODE_TYPES.VariableDeclaration,
        } as TSESTree.Node,
        {} as Context,
        "fixer"
      )
    ).toEqual([]);
  });
});
