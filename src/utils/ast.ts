import type { Expression, JSXAttribute } from "estree-jsx";

type Val = string | number | bigint | boolean | RegExp | null | undefined;

export function extractFromNode(node: JSXAttribute) {
  // const token = extractTokenFromNode(node)
  // if (token) {
  //   return token.raw;
  // }

  // value: Literal | JSXExpressionContainer | JSXElement | JSXFragment | null
  const valueType = node.value?.type;
  if (!valueType) return;

  const result: Val[] = [];

  // 1. Literal className="..."
  if (valueType === "Literal") result.push(node.value?.value);
  // 2. JSXExpressionContainer className={...}
  else if (valueType === "JSXExpressionContainer") {
    const expression = node.value?.expression;

    if (expression?.type === "JSXEmptyExpression" || !expression) return;

    if (expression.type === "Literal") return [expression.value];
    if (expression.type === "TemplateLiteral")
      result.push(expression.quasis[0].value.raw);

    result.push(...extractFromExpression(expression));
  }

  // Exit if JSXElement | JSXFragment | null
  if (
    valueType === "JSXElement" ||
    valueType === "JSXFragment" ||
    !node.value
  ) {
    return;
  }

  return result;
}

function extractFromExpression(expression: Expression) {
  // We care about:
  // -> Literal;
  // -> TemplateLiteral;
  // -> BinaryExpression
  // -> CallExpression;
  // -> ConditionalExpression;
  // -> LogicalExpression;

  const result: Val[] = [];

  if (expression.type === "Literal") result.push(expression.value);
  if (expression.type === "TemplateLiteral")
    result.push(expression.quasis[0].value.raw);
  if (expression.type === "ConditionalExpression") {
    console.log(expression);
    // result.push(extractFromExpression(expression.left));
    // result.push(extractFromExpression(expression.right));
  }
  if (expression.type === "CallExpression") {
    expression.arguments.forEach((arg) => {
      if (arg.type === "SpreadElement") {
        result.push(...extractFromExpression(arg.argument));
      } else {
        result.push(...extractFromExpression(arg));
      }
    });
  }
  if (expression.type === "ConditionalExpression") {
    result.push(...extractFromExpression(expression.consequent));
    result.push(...extractFromExpression(expression.alternate));
  }
  if (expression.type === "LogicalExpression") {
    result.push(...extractFromExpression(expression.right));
  }

  return result;
}

export function extractTokenFromNode(
  node: JSXAttribute,
  runner: "checker" | "fixer"
): { type: string; value?: string; raw?: string } | undefined {
  // value: Literal | JSXExpressionContainer | JSXElement | JSXFragment | null
  const type = node.value?.type;
  if (!type) return;

  if (type === "Literal") return validate(node.value);

  if (type === "JSXExpressionContainer") {
    const expression = node.value?.expression;

    if (expression?.type === "JSXEmptyExpression" || !expression) return;

    return extractTokenFromExpression(expression, runner);
  }

  return;
}

function extractTokenFromExpression(
  expression: Expression,
  runner: "checker" | "fixer"
): { type: string; value: string; raw: string } | undefined {
  // We care about:
  // -> Literal;
  // -> TemplateLiteral;
  // -> BinaryExpression
  // -> CallExpression;
  // -> ConditionalExpression;
  // -> LogicalExpression;

  const rerun = (expression: Expression) => {
    return extractTokenFromExpression(expression, runner);
  };

  const isFixer = runner === "fixer";
  const type = expression.type;

  if (type === "Literal")
    return validate({
      ...expression,
      value: expression.value || expression.raw,
    });
  if (type === "TemplateLiteral") {
    return validate({
      ...expression.quasis[0],
      value: expression.quasis[0].value.cooked,
      raw: "`" + expression.quasis[0].value.raw + "`",
    });
  }

  if (type === "LogicalExpression") {
    return rerun(expression.right);
  }

  if (type === "ConditionalExpression") {
    // TODO: Currently, Auto Fixer works on the consequent only
    if (isFixer) {
      return rerun(expression.consequent);
    } else {
      const consequent = rerun(expression.consequent);
      const alternate = rerun(expression.alternate);
      consequent!.value = `${consequent!.value}" : "${alternate!.value}`;
      return consequent;
    }
  }

  console.log("UNIMPLEMENTED: ", type);

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

  return;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validate(result: null | { type: string; value?: any; raw?: string }):
  | undefined
  | {
      type: string;
      value: string;
      raw: string;
    } {
  if (!result) return;
  if (typeof result.value !== "string") return;
  if (typeof result.raw !== "string") return;

  return result as { type: string; value: string; raw: string };
}
