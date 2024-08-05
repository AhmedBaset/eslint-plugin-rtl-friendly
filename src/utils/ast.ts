import type { TSESTree } from "@typescript-eslint/utils";

export type Token = (
  | TSESTree.JSXAttribute
  | TSESTree.Expression
  | TSESTree.TemplateElement
) & {
  getValue: () => string;
  getRaw: () => string;
};

export function extractTokenFromNode(
  node: TSESTree.JSXAttribute,
  runner: "checker" | "fixer"
): (Token | undefined | null)[] {
  // value: Literal | JSXExpressionContainer | JSXElement | JSXFragment | null
  const type = node.value?.type;
  if (!type) return [];

  const nodeValue = node.value;

  if (isStringLiteral(nodeValue))
    return format(
      nodeValue,
      (n) => n.value,
      (n) => n.raw
    );

  if (type === "JSXExpressionContainer") {
    const expression = node.value?.expression;

    if (!expression || expression?.type === "JSXEmptyExpression") return [];

    return extractTokenFromExpression(expression, runner);
  }

  return [];
}

function extractTokenFromExpression(
  exp: TSESTree.Expression,
  runner: "checker" | "fixer"
): (Token | undefined)[] {
  // We care about:
  // -> Literal;
  // -> TemplateLiteral;
  // -> BinaryExpression
  // -> CallExpression;
  // -> ConditionalExpression;
  // -> LogicalExpression;

  const rerun = (expression: TSESTree.Expression) => {
    return extractTokenFromExpression(expression, runner);
  };

  // const isFixer = runner === "fixer";
  const type = exp.type;

  if (isStringLiteral(exp))
    return format(
      exp,
      () => exp.value,
      () => exp.raw
    );

  if (exp?.type === "TemplateLiteral") {
    return format(
      exp.quasis,
      (q) => q.value.cooked,
      (q) => `\`${q.value.raw}\``
    );
  }

  if (exp.type === "LogicalExpression") {
    // isCondition && "..."
    return rerun(exp.right);
  }

  if (exp.type === "ConditionalExpression") {
    return [...rerun(exp.consequent), ...rerun(exp.alternate)];

  }

 // console.log("UNIMPLEMENTED: ", type);

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
  nodeOrToken: T | T[],
  getValue: (t: T) => string,
  getRaw: (t: T) => string
): (T & { getValue: () => string; getRaw: () => string })[] {
  if (Array.isArray(nodeOrToken)) {
    return nodeOrToken.map((t) => ({
      ...t,
      getValue: () => getValue(t),
      getRaw: getRaw ? () => getRaw(t) : () => getValue(t),
    }));
  }

  return [
    {
      ...nodeOrToken,
      getValue: () => getValue(nodeOrToken),
      getRaw: () => (getRaw ?? getValue)(nodeOrToken),
    },
  ] as const;
}

function isStringLiteral(
  value: TSESTree.JSXAttribute["value"] | TSESTree.Expression
): value is TSESTree.StringLiteral {
  return value?.type === "Literal" && typeof value?.value === "string";
}
