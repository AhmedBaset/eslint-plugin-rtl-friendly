import { Rule } from 'eslint';
import { logicalProperties } from '../configs/tw-logical-properties';
import { JSXAttribute } from 'estree-jsx';

const exampleRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Encourage the use of RTL-friendly styles',
      recommended: true,
    },
    fixable: 'code',
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
    if (typeof node.name.name === 'string') attr = node.name.name;
    else attr = node.name.name.name;

    const isClassAttribute = ['className', 'class'].includes(attr);
    if (!isClassAttribute) return;

    if (node.value?.type !== 'Literal') return;

    // This can be string | number | boolean | null but className doesn't accept anything but string
    const value = node.value.value as string;
    const cnArr = value.split(' ');

    // PH = Physical, LG = Logical
    const PH_CNs = logicalProperties.map((c) => c.physical);

    const conflictClassNames = cnArr.filter((cn) =>
      PH_CNs.some((c) => cn.startsWith(c))
    );

    if (!conflictClassNames.length) return;

    ctx.report({
      node,
      messageId: 'noPhysicalProperties',
      data: {
        invalid: conflictClassNames.join(' '),
        valid: conflictClassNames
          .map((cn) => {
            const { logical, physical } = logicalProperties.find((c) =>
              cn.startsWith(c.physical)
            )!;
            return cn.replace(physical, logical);
          })
          .join(' '),
      },

      fix: (fixer) => {
        const fixedClassName = cnArr
          .map((cn) => {
            if (conflictClassNames.includes(cn)) {
              const { logical, physical } = logicalProperties.find((c) =>
                cn.startsWith(c.physical)
              )!;
              return cn.replace(physical, logical);
            }
            return cn;
          })
          .join(' ');

        return fixer.replaceText(node, `${attr}="${fixedClassName}"`);
      },
    });

    return;
  };
  return {
    JSXAttribute: jsxAttribute,
  } as Rule.RuleListener;
};
