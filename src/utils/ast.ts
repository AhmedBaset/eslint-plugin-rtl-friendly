import type { TSESTree } from "@typescript-eslint/utils";

const unimplemented = new Set<string>();

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

  if (!unimplemented.has(type)) { 
    console.log("Unimplemented: ", type, node);
    unimplemented.add(type);
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

  if (exp.type === "Literal") {
    if (typeof exp.value !== "string") return []; // boolean, number, null, undefined, etc...

    return format(
      exp,
      () => exp.value,
      () => exp.raw
    );
  }

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

  if (exp.type === "ArrayExpression") {
    return exp.elements.flatMap((el) => {
      if (!el) return [];

      if (el.type === "SpreadElement") return rerun(el.argument);

      return rerun(el);
    });
  }

  if (exp.type === "ObjectExpression") {
    return exp.properties.flatMap((prop) => {
      if (prop.type === "SpreadElement") return rerun(prop.argument);

      return [prop.key, prop.value].flatMap((el) => {
        if (
          el.type === "AssignmentPattern" ||
          el.type === "TSEmptyBodyFunctionExpression"
        )
          return [];

        return rerun(el);
      });
    });
  }

  if (exp.type === "CallExpression") {
    return exp.arguments.flatMap((arg) => {
      if (arg.type === "SpreadElement") {
        return rerun(arg.argument);
      }

      return rerun(arg);
    });
  }

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
