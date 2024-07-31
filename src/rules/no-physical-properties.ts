/* eslint-disable */
import { Rule } from "eslint";
import { logicalProperties } from "../configs/tw-logical-properties.js";

import * as ESTree from "estree";
import type { JSXAttribute } from "estree-jsx";

const regexes = (physical: string) => [
  new RegExp(`^${physical}.*`),
  new RegExp(`^!${physical}.*`),
  new RegExp(`^-${physical}.*`),
  new RegExp(`^.+:${physical}.*`),
  new RegExp(`^.+:-${physical}.*`),
  new RegExp(`^.+:!${physical}.*`),
  new RegExp(`^.+:!-${physical}.*`),
];

const noPhysicalProperties: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Encourage the use of RTL-friendly styles",
      recommended: true,
    },
    fixable: "code",
    messages: {
      noPhysicalProperties: `Avoid using physical properties such as "{{ invalid }}". Instead, use logical properties like "{{ valid }}" for better RTL support.`,
    },
    schema: [],
  },
  create(ctx): Rule.RuleListener {
    return {
      JSXAttribute: (_node: ESTree.Node) => {
        const node = _node as JSXAttribute;

        if (node.name.type !== "JSXIdentifier") return;
        const attr = node.name.name;

        const isClassAttribute = ["className", "class"].includes(attr);
        if (!isClassAttribute) return;

        const valueType = node.value?.type;
        let value = "" as any;
        if (valueType === "Literal") value = node.value?.value;
        else if (valueType === "JSXExpressionContainer") {
          const expression = node.value?.expression;
          if (expression?.type === "Literal") {
            value = expression.value;
          } else if (expression?.type === "TemplateLiteral") {
            value = expression.quasis[0].value.raw;
          } else if (expression?.type === "CallExpression") {
            // TODO: Handle functions
            // const callee = expression.callee;
            // if (callee?.type === "Identifier" && callee.name === "cn") {
            //   const args = expression.arguments;
            //   if (args.length === 1) {
            //     const arg = args[0];
            //     if (arg.type === "Literal") v1 = arg.value as string;
            //   }
            // }
          }
        }
        if (typeof value !== "string") return;

        const cnArr = value.split(" ");

        // PH = Physical, LG = Logical
        const PH_CNs = logicalProperties.map((c) => c.physical);

        const conflictClassNames = cnArr.filter((cn) =>
          PH_CNs.some((c) => {
            let isValid = false;
            regexes(c).forEach((regex) => {
              if (regex.test(cn)) isValid = true;
            });
            return isValid;
          })
        );

        if (!conflictClassNames.length) return;

        ctx.report({
          node: _node,
          messageId: "noPhysicalProperties",
          data: {
            invalid: conflictClassNames.join(" "),
            valid: conflictClassNames
              .map((cn) => {
                const prop = logicalProperties.find((c) => {
                  let isValid = false;
                  regexes(c.physical).forEach((regex) => {
                    if (regex.test(cn)) isValid = true;
                  });
                  return isValid;
                });
                if (!prop) return cn;
                return cn.replace(prop.physical, prop.logical);
              })
              .join(" "),
          },
          fix: (fixer) => {
            const fixedClassName = cnArr
              .map((cn) => {
                if (conflictClassNames.includes(cn)) {
                  const prop = logicalProperties.find((c) => {
                    let isValid = false;
                    regexes(c.physical).forEach((regex) => {
                      if (regex.test(cn)) isValid = true;
                    });
                    return isValid;
                  });
                  if (!prop) return cn;
                  return cn.replace(prop.physical, prop.logical);
                }
                return cn;
              })
              .join(" ");

            return fixer.replaceText(_node, `${attr}="${fixedClassName}"`);
          },
        });

        return;
      },
    };
  },
};

export default noPhysicalProperties;
