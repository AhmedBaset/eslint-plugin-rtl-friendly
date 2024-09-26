import type { TSESTree } from "@typescript-eslint/utils";
import type {
  RuleContext,
  RuleModule,
} from "@typescript-eslint/utils/ts-eslint";
import { type Token, extractTokensFromNode } from "../../utils/ast.js";
import { parseForPhysicalClasses } from "../../utils/tailwind.js";

// const cache = new Map<
//   /** invalid */ string,
//   /** valid */ string
// >();

// const createRule = ESLintUtils.RuleCreator((ruleName) => {
//   return `https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/blob/main/src/rules/${ruleName}/README.md`;
// });

export const RULE_NAME = "no-physical-properties";

export const NO_PHYSICAL_CLASSESS = "NO_PHYSICAL_CLASSESS";
export const IDENTIFIER_USED = "IDENTIFIER_USED";
export type MessageId = "NO_PHYSICAL_CLASSESS" | "IDENTIFIER_USED";

export const noPhysicalProperties: RuleModule<MessageId> = {
  // name: RULE_NAME,
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Encourage the use of RTL-friendly styles",
      url: "https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/blob/main/src/rules/no-physical-properties/README.md",
    },
    fixable: "code",
    messages: {
      [NO_PHYSICAL_CLASSESS]: `Avoid using physical properties such as "{{ invalid }}". Instead, use logical properties like "{{ valid }}" for better RTL support.`,
      [IDENTIFIER_USED]: `This text is used later as a class name but contains physical properties such as "{{ invalid }}". It's better to use logical properties like "{{ valid }}" for improved RTL support.`,
    },
    schema: [],
  },
  create: (ctx) => {
    return {
      JSXAttribute: (node) => {
        if (node.name.type !== "JSXIdentifier") return;
        const attr = node.name.name;

        const isClassAttribute = ["className", "class"].includes(attr);
        if (!isClassAttribute) return;

        // let result = extractFromNode(node);
        // if (!result) return;

        // result = result.filter((c) => typeof c === "string");
        // if (!result.length) return;

        // const classesAsString = result.join(" ");
        // const cachedValid = cache.get(classesAsString);
        // if (cachedValid) {
        //   console.log("cachedValid", cachedValid);
        //   report({ ctx, node, invalid: classesAsString, valid: cachedValid });
        //   return;
        // }

        const tokens = extractTokensFromNode(node, ctx, "checker");
        tokens?.forEach((token) => {
          const classValue = token?.getValue();
          if (!classValue) return;

          const classes = classValue.split(" ");

          const parsed = parseForPhysicalClasses(classes);

          const isInvalid = parsed.some((p) => p.isInvalid);
          if (!isInvalid) return;

          const invalid = parsed.map((p) => p.original).join(" ");
          const valid = parsed.map((p) => p.valid).join(" ");

          // cache.set(classesAsString, valid);
          report({
            ctx,
            node,
            messageId: token.messageId,
            invalid,
            valid,
            token,
          });
        });
      },
    };
  },
};

export type Context = Readonly<
  RuleContext<"NO_PHYSICAL_CLASSESS" | "IDENTIFIER_USED", []>
>;

function report({
  ctx,
  invalid,
  valid,
  node,
  token,
  messageId,
}: {
  messageId: MessageId;
  ctx: Context;
  node: TSESTree.JSXAttribute;
  invalid: string;
  valid: string;
  token: Token;
}) {
  return ctx.report({
    node,
    messageId,
    data: {
      invalid,
      valid,
    },
    loc: {
      start: token?.loc?.start,
      end: token?.loc?.end,
    },
    fix: (fixer) => {
      return fixer.replaceText(token, token?.getRaw()?.replace(invalid, valid));
    },
  });
}
