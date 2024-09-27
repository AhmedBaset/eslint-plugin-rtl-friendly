import type { TSESTree } from "@typescript-eslint/utils";
import type {
  RuleContext,
  RuleModule,
} from "@typescript-eslint/utils/ts-eslint";
import { type Token, extractTokensFromNode } from "./ast.js";
import { parseForPhysicalClasses } from "./tailwind.js";
import { FLAGS } from "../../flags.js";

// const cache = new Map<
//   /** invalid */ string,
//   /** valid */ string
// >();

// const createRule = ESLintUtils.RuleCreator((ruleName) => {
//   return `https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/blob/main/src/rules/${ruleName}/README.md`;
// });

// Since the rule is no longer for physical properties specifically,
// we consider renaming it e.g. `rtl-friendly/tailwind`
export const RULE_NAME = "no-physical-properties";

export const NO_PHYSICAL_CLASSESS = "NO_PHYSICAL_CLASSESS";
export const IDENTIFIER_USED = "IDENTIFIER_USED";
export type MessageId = "NO_PHYSICAL_CLASSESS" | "IDENTIFIER_USED";
export type Rule = RuleModule<
  MessageId,
  [{ allowPhysicalInsetWithAbsolute?: boolean; debug?: boolean }]
>;

export const noPhysicalProperties: Rule = {
  // name: RULE_NAME,
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
    schema: [
      {
        type: "object",
        properties: {
          allowPhysicalInsetWithAbsolute: {
            type: "boolean",
            default: false,
          },
          debug: {
            type: "boolean",
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [FLAGS],
  create: (ctx) => {
    return {
      JSXAttribute: (node) => {
        if (node.name.type !== "JSXIdentifier") return;
        const attr = node.name.name;

        const isClassAttribute = ["className", "class"].includes(attr);
        if (!isClassAttribute) return;

        // const classesAsString = result.join(" ");
        // const cachedValid = cache.get(classesAsString);
        // if (cachedValid) {
        //   console.log("cachedValid", cachedValid);
        //   report({ ctx, node, invalid: classesAsString, valid: cachedValid });
        //   return;
        // }

        const allowPhysicalInsetWithAbsolute =
          ctx.options[0]?.allowPhysicalInsetWithAbsolute ??
          FLAGS.allowPhysicalInsetWithAbsolute;
        const debug = ctx.options[0]?.debug ?? FLAGS.debug;

        const tokens = extractTokensFromNode(node, ctx, { debug });
        tokens?.forEach((token) => {
          const classValue = token?.getValue();
          if (!classValue) return;

          const parsed = parseForPhysicalClasses(
            classValue,
            allowPhysicalInsetWithAbsolute
          );

          const isInvalid = parsed.some((p) => p.isInvalid);
          if (!isInvalid) return;

          // cache.set(classesAsString, valid);
          report({
            ctx,
            node,
            messageId: token.messageId,
            parsed,
            token,
          });
        });
      },
    };
  },
};

export function ruleSettings(options: Partial<Rule["defaultOptions"][number]>) {
  return options;
}

export type Context = Readonly<
  RuleContext<keyof Rule["meta"]["messages"], Rule["defaultOptions"]>
>;

function report({
  ctx,
  parsed,
  node,
  token,
  messageId,
}: {
  messageId: MessageId;
  ctx: Context;
  node: TSESTree.JSXAttribute;
  token: Token;
  parsed: ReturnType<typeof parseForPhysicalClasses>;
}) {
  return ctx.report({
    node,
    messageId,
    data: {
      invalid: parsed
        .filter((c) => c.isInvalid)
        .map((c) => c.original)
        .join(" "),
      valid: parsed
        .filter((c) => c.isInvalid)
        .map((c) => c.valid)
        .join(" "),
    },
    loc: {
      start: token?.loc?.start,
      end: token?.loc?.end,
    },
    fix: (fixer) => {
      return fixer.replaceText(
        token,
        token
          ?.getRaw()
          ?.replace(
            parsed.map((p) => p.original).join(" "),
            parsed.map((p) => p.valid).join(" ")
          )
      );
    },
  });
}
