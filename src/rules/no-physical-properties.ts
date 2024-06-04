import { Rule } from "eslint";
import { JSXAttribute } from "estree-jsx";
import { logicalProperties } from "../configs/tw-logical-properties";

/**
 * **TODO** Refactor this ugly code
 * **TODO** Add support for `className={cn('ms-1', 'me-2')}`
 */

const regexes = (physical: string) => [
  new RegExp(`^${physical}.*`),
  new RegExp(`^!${physical}.*`),
  new RegExp(`^-${physical}.*`),
  new RegExp(`^.+:${physical}.*`),
  new RegExp(`^.+:-${physical}.*`),
];

const exampleRule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Encourage the use of RTL-friendly styles",
      recommended: true,
    },
    fixable: "code",
    messages: {
      noPhysicalProperties: `Don't use physical properties like "{{ invalid }}" Use logical properties like "{{ valid }}" instead`,
    },
    schema: [],
    hasSuggestions: true,
  },
  create(ctx) {
    return ruleListener(ctx);
  },
};

export default exampleRule;

const ruleListener = (ctx: Rule.RuleContext) => {
  const jsxAttribute = (node: JSXAttribute) => {
    let attr: string;
    if (typeof node.name.name === "string") attr = node.name.name;
    else attr = node.name.name.name;

    const isClassAttribute = ["className", "class"].includes(attr);
    if (!isClassAttribute) return;

    if (node.value?.type !== "Literal") return;

    // This can be string | number | boolean | null but className doesn't accept anything but string
    const value = node.value.value as string;
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
      node,
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

        return fixer.replaceText(node, `${attr}="${fixedClassName}"`);
      },
    });

    return;
  };
  return {
    JSXAttribute: jsxAttribute,
  } as Rule.RuleListener;
};
