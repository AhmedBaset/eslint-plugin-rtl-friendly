import { Rule } from "eslint";

import * as ESTree from "estree";
import type { JSXAttribute } from "estree-jsx";
import { extractFromNode } from "../../utils/ast.js";
import { parseForPhysicalClasses } from "../../utils/tailwind.js";

const cache = new Map</** invalid */ string, /** valid */ string>();

export const NO_PHYSICAL_CLASSESS = "NO_PHYSICAL_CLASSESS";

export const noPhysicalProperties: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Encourage the use of RTL-friendly styles",
      recommended: true,
    },
    fixable: "code",
    messages: {
      [NO_PHYSICAL_CLASSESS]: `Avoid using physical properties such as "{{ invalid }}". Instead, use logical properties like "{{ valid }}" for better RTL support.`,
    },
    schema: [],
  },
  create(ctx) {
    return {
      JSXAttribute: (estreeNode: ESTree.Node) => {
        const node = estreeNode as JSXAttribute;

        if (node.name.type !== "JSXIdentifier") return;
        const attr = node.name.name;

        const isClassAttribute = ["className", "class"].includes(attr);
        if (!isClassAttribute) return;

        let result = extractFromNode(node);
        if (!result) return;

        result = result.filter((c) => typeof c === "string");
        if (!result.length) return;

        const classesAsString = result.join(" ");
        const cachedValid = cache.get(classesAsString);
        if (cachedValid) {
          report({ ctx, node, invalid: classesAsString, valid: cachedValid });
          return;
        }

        const classes = classesAsString.split(" ");

        const parsed = parseForPhysicalClasses(classes);

        const isInvalid = parsed.some((p) => p.isInvalid);
        if (!isInvalid) return;

        const invalid = parsed.map((p) => p.original).join(" ");
        const valid = parsed.map((p) => p.valid).join(" ");

        cache.set(classesAsString, valid);
        report({ ctx, node, invalid, valid });
      },
    };
  },
};

function report({
  ctx,
  invalid,
  valid,
  node,
}: {
  ctx: Rule.RuleContext;
  node: JSXAttribute;
  invalid: string;
  valid: string;
}) {
  return ctx.report({
    node,
    messageId: "NO_PHYSICAL_CLASSESS",
    data: {
      invalid,
      valid,
    },
    loc: {
      start: node.loc!.start,
      end: node.loc!.end,
    },
    fix: (fixer) => {
      if (node.value?.type === "Literal") {
        return fixer.replaceText(
          node.value,
          node.value.raw?.replace(invalid, valid) ?? ""
        );
      }

      return null;
    },
  });
}
