import { TSESTree } from "@typescript-eslint/utils";
import type { Context } from "../rules/no-phyisical-properties/rule";

const unimplemented = new Set<string>();

export type Token = (
  | TSESTree.JSXAttribute
  | TSESTree.Expression
  | TSESTree.TemplateElement
) & {
  getValue: () => string;
  getRaw: () => string;
};

export function extractTokensFromNode(
  // node: TSESTree.JSXAttribute,
  node: TSESTree.Node,
  ctx: Context,
  runner: "checker" | "fixer"
): Token[] {
  const run = (exp: Exp) => extractTokensFromExpression(exp, ctx, runner);

  if (node.type === "JSXAttribute") {
    // value: Literal | JSXExpressionContainer | JSXElement | JSXFragment | null
    const value = node.value;
    if (!value) return [];

    if (value?.type === "Literal") {
      if (typeof value.value !== "string") return []; // boolean, number, null, undefined, etc...
      return format(value, value.value, value.raw);
    }

    if (value.type === "JSXExpressionContainer") {
      const expression = value?.expression;

      if (!expression || expression?.type === "JSXEmptyExpression") return [];

      return extractTokensFromExpression(expression, ctx, runner);
    }

    if (value.type === "JSXElement" || value.type === "JSXSpreadChild") {
      return [];
    }

    return [];
  }

  if (is(node, "VariableDeclarator")) {
    if (!node.init) return [];
    return run(node.init);
  }

  if (is(node, "ArrowFunctionExpression")) return run(node);

  return [];
}

type Exp = TSESTree.Expression | TSESTree.TemplateElement;

function extractTokensFromExpression(
  exp: Exp,
  ctx: Context,
  runner: "checker" | "fixer"
): Token[] {
  const rerun = (expression: Exp) => {
    return extractTokensFromExpression(expression, ctx, runner);
  };

  // const isFixer = runner === "fixer";

  if (is(exp, "Literal")) {
    if (typeof exp.value !== "string") return []; // boolean, number, null, undefined, etc...

    return format(
      exp,
      () => exp.value,
      () => exp.raw
    );
  }

  if (is(exp, "TemplateLiteral")) {
    return format(
      exp.quasis,
      (q) => q.value.cooked,
      (q) => `\`${q.value.raw}\``
    );
  }

  if (is(exp, "TemplateElement")) {
    return format(exp, exp.value.cooked, `\`${exp.value.raw}\``);
  }

  if (is(exp, "LogicalExpression")) {
    // isCondition && "..."
    return rerun(exp.right);
  }

  if (is(exp, "ConditionalExpression")) {
    return [...rerun(exp.consequent), ...rerun(exp.alternate)];
  }

  if (is(exp, "ArrayExpression")) {
    return exp.elements.flatMap((el) => {
      if (!el) return [];

      if (el.type === "SpreadElement") return rerun(el.argument);

      return rerun(el);
    });
  }

  if (is(exp, "ObjectExpression")) {
    return exp.properties.flatMap((prop) => {
      if (prop.type === "SpreadElement") return rerun(prop.argument);

      return [prop.key, prop.value].flatMap((el) => {
        if (
          el.type === "AssignmentPattern" ||
          el.type === "TSEmptyBodyFunctionExpression"
        ) {
          return [];
        }

        return rerun(el);
      });
    });
  }

  if (is(exp, "CallExpression")) {
    return exp.arguments.flatMap((arg) => {
      if (arg.type === "SpreadElement") {
        return rerun(arg.argument);
      }

      return rerun(arg);
    });
  }

  if (is(exp, "BinaryExpression")) {
    const right = rerun(exp.right);
    if (exp.left.type === "PrivateIdentifier") return right;
    return [...right, ...rerun(exp.left)];
  }

  if (is(exp, "TaggedTemplateExpression")) {
    // tw`...`
    return exp.quasi.quasis.flatMap((q) => rerun(q));
  }

  if (is(exp, "Identifier")) {
    // We should follow the identifier and get the value
    const scope = ctx.sourceCode.getScope(exp);
    const binding = scope?.set.get(exp.name);
    const node = binding?.defs[0].node;
    if (!node) return [];

    return extractTokensFromNode(node, ctx, runner);
  }

  if (is(exp, "MemberExpression")) {
    return [];
  }

  if (is(exp, "ArrowFunctionExpression")) {
    if (is(exp.body, "BlockStatement")) {
      const returnStatement = exp.body.body.find((s) =>
        is(s, "ReturnStatement")
      );
      return returnStatement?.argument ? rerun(returnStatement.argument) : [];
    }
    return rerun(exp.body);
  }

  // if ((unsupported as typeof exp.type[]).includes(exp.type)) {
  //   if (
  //     is(exp, "ArrayPattern") ||
  //     is(exp, "ObjectPattern") ||
  //     is(exp, "ArrowFunctionExpression") ||
  //     is(exp, "AssignmentExpression") ||
  //   is(exp, "AwaitExpression") ||
  //   is(exp, "ChainExpression") ||
  //   is(exp, "ClassExpression") ||
  //   is(exp, "FunctionExpression") ||
  //   is(exp, "ImportExpression") ||
  //   is(exp, "JSXElement") ||
  //   is(exp, "JSXFragment") ||
  //   is(exp, "MetaProperty") ||
  //   is(exp, "NewExpression") ||
  //   is(exp, "SequenceExpression") ||
  //   is(exp, "Super") ||
  //   is(exp, "ThisExpression") ||
  //   is(exp, "UnaryExpression") ||
  //   is(exp, "UpdateExpression") ||
  //   is(exp, "VariableDeclaration") ||
  //   is(exp, "VariableDeclarator") ||
  //   is(exp, "WhileStatement") ||
  //   is(exp, "YieldExpression") ||
  //   is(exp, "TSAsExpression") ||
  //   is(exp, "TSInstantiationExpression") ||
  //   is(exp, "TSNonNullExpression") ||
  //   is(exp, "TSSatisfiesExpression") ||
  //   is(exp, "TSTypeAssertion")
  // ) {
  //   return [];
  // }

  if (!unimplemented.has(exp.type)) {
    console.log("Unimplemented: ", exp.type, exp);
    unimplemented.add(exp.type);
  }

  // if (expression.type === "BinaryExpression") {
  //   result.push(...extractFromExpression(expression.left));
  //   result.push(...extractFromExpression(expression.right));
  // }
  // if (expression.type === "CallExpression") {
  //   expression.arguments.forEach((arg) => {
  //     if (arg.type === "SpreadElement") {
  //       result.push(...extractFromExpression(arg.argument));
  //     } else {
  //       result.push(...extractFromExpression(arg));
  //     }
  //   });
  // }
  // if (expression.type === "ConditionalExpression") {
  //   result.push(...extractFromExpression(expression.consequent));
  //   result.push(...extractFromExpression(expression.alternate));
  // }
  // if (expression.type === "LogicalExpression") {
  //   result.push(...extractFromExpression(expression.right));
  // }

  return [];
}

function format<
  T extends
    | TSESTree.JSXAttribute
    | TSESTree.Expression
    | TSESTree.TemplateElement,
>(
  token: T | T[],
  getValue: string | ((t: T) => string),
  getRaw: string | ((t: T) => string)
): (T & { getValue: () => string; getRaw: () => string })[] {
  if (Array.isArray(token)) {
    return token.map((t) => ({
      ...t,
      getValue: () => callOrValue(getValue, t),
      getRaw: () => callOrValue(getRaw, t),
    }));
  }

  return [
    {
      ...token,
      getValue: () => callOrValue(getValue, token),
      getRaw: () => callOrValue(getRaw, token),
    },
  ] as const;
}

function callOrValue<T extends string>(func: T | (() => T)): T;
function callOrValue<T extends string, P>(
  func: T | ((arg: P) => T),
  param: P
): T;
function callOrValue<T extends string, P>(
  func: T | ((arg: P) => T),
  param?: P
): T {
  return typeof func === "function" ? func(param!) : func;
}

function is<E extends Exp | TSESTree.Node, T extends E["type"]>(
  exp: E,
  type: `${T}`
): exp is Extract<E, { type: T }> {
  return exp.type === type;
}
