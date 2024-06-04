import path from "path";

import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { CategoryInfo, RuleInfo, categories } from "./rules";

/**
 * Render a given rule as a table row.
 */
function renderRule(rule: RuleInfo): string {
  const mark = `${rule.recommended ? "⭐️" : ""}${rule.fixable ? "✒️" : ""}`;
  const link = `[${rule.id}](./docs/rules/${rule.name}.md)`;
  const description = rule.description || "(no description)";

  return `| ${link} | ${description} | ${mark} |`;
}

/**
 * Render a given category as a section.
 */
function renderCategory(category: CategoryInfo): string {
  if (category.rules.length === 0) {
    return "";
  }
  return `### ${category.id}

| Rule ID | Description |    |
|:--------|:------------|:--:|
${category.rules.map(renderRule).join("\n")}
`;
}

const filePath = path.resolve(__dirname, "../../README.md");
const content = categories.map(renderCategory).filter(Boolean).join("\n");

writeFile(
  filePath,
  readFileSync(filePath, "utf8").replace(
    /<!--RULE_TABLE_BEGIN-->[\s\S]*<!--RULE_TABLE_END-->/u,
    `<!--RULE_TABLE_BEGIN-->\n${content}\n<!--RULE_TABLE_END-->`
  )
);
