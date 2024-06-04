import { readdirSync } from "fs";
import path from "path";
import { pluginId } from "./plugin-id";
const rootDir = path.resolve(__dirname, "../../src/rules/");

type RuleType = "suggestion" | "problem" | "layout";

export type RuleInfo = {
  filePath: string;
  id: string;
  name: string;
  type: RuleType;
  description: string;
  recommended: boolean;
  deprecated: boolean;
  fixable: boolean;
  replacedBy: string[];
};

export type CategoryInfo = {
  id: RuleType;
  rules: RuleInfo[];
};

const rulesDirContent = readdirSync(rootDir);

export const rules: RuleInfo[] = rulesDirContent
  .sort()
  .map((filename): RuleInfo | false => {
    const filePath = path.join(rootDir, filename);
    const name = filename.slice(0, -3);
    const file = require(filePath).default;
    if (!file) return false;

    const { meta } = file;

    return {
      filePath,
      id: `${pluginId}/${name}`,
      name,
      deprecated: Boolean(meta.deprecated),
      fixable: Boolean(meta.fixable),
      replacedBy: [],
      type: meta.type,
      ...meta.docs,
    };
  })
  .filter<RuleInfo>((rule): rule is RuleInfo => Boolean(rule));

const ruleTypes: RuleType[] = ["suggestion", "problem", "layout"];

export const categories: CategoryInfo[] = ruleTypes.map(
  (id): CategoryInfo => ({
    id,
    rules: rules.filter((rule) => rule.type === id && !rule.deprecated),
  })
);
