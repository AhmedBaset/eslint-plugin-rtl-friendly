import type { Expression, JSXAttribute } from "estree-jsx";

type Val = string | number | bigint | boolean | RegExp | null | undefined;

export function extractFromNode(node: JSXAttribute) {
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
  if (expression.type === "BinaryExpression") {
    result.push(...extractFromExpression(expression.left));
    result.push(...extractFromExpression(expression.right));
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
