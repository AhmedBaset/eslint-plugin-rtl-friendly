import { existsSync } from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import { pluginId } from "./lib/plugin-id";

const addRule = async () => {
  const ruleId = process.argv[2];
  const type = process.argv[3];

  // Require rule ID.
  if (!ruleId) {
    console.error("Usage: npm run add-rule <RULE_ID> <RULE_TYPE>");
    process.exitCode = 1;
    return;
  }

  // Require rule type.
  if (!type) {
    console.error(
      "Usage: npm run add-rule <RULE_ID> <RULE_TYPE> \n\npossible <RULE_TYPE>: problem | suggestion | layout"
    );
    process.exitCode = 1;
    return;
  }

  const docPath = path.resolve(__dirname, "../docs/rules", `${ruleId}.md`);
  const rulePath = path.resolve(__dirname, "../src/rules", `${ruleId}.ts`);
  const testPath = path.resolve(__dirname, "../tests/rules", `${ruleId}.ts`);

  // Overwrite check.
  for (const filePath of [docPath, rulePath, testPath]) {
    if (existsSync(filePath)) {
      console.error(
        "%o has existed already.",
        path.relative(process.cwd(), filePath)
      );
      process.exitCode = 1;
      return;
    }
  }

  // Generate files.
  await writeFile(
    docPath,
    `# ${pluginId}/${ruleId}
> (TODO: summary)

(TODO: why is this rule useful?)

## Rule Details

(TODO: how does this rule check code?)

## Options

(TODO: what do options exist?)
`
  );

  await writeFile(
    rulePath,
    `import { Rule } from "eslint";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      // TODO: write the rule summary.
      description: "",
      recommended: false,
    },
    type: "${type}"
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    const sourceCode = context.getSourceCode();
    console.log(sourceCode);
    return {};
  },
};

export default rule;
`
  );

  await writeFile(
    testPath,
    `
import { RuleTester } from "eslint";
import rule from "../../src/rules/${ruleId}";

const tester = new RuleTester({
  parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
  }
});

tester.run("${ruleId}", rule, {
  valid: [],
  invalid: [],
});
`
  );
};

addRule();
