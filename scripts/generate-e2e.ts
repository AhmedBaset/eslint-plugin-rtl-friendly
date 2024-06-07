import { exec } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import { logicalProperties } from "../src/configs/tw-logical-properties";
import path from "path";

const modifiers = [
  "md",
  "dark",
  "dark:md:hover",
  "@md",
  "@md:dark:hover",
  "group-has",
  "[&>svg]",
  "data-[state=active]",
  "aria-[hidden]",
  "group-hover/name"
];

let valid = "<h2>Valid</h2>\n";
let validWithNegative = "<h2>Valid with negative</h2>\n";
let validWithImportant = "<h2>Valid important</h2>\n";
let validWithModifier = "<h2>Valid with modifiers</h2>\n";
let validWithModifierAndNegative =
  "<h2>Valid with modifiers and negative</h2>\n";
let validWithModifierAndImportant =
  "<h2>Valid with modifiers and important</h2>\n";
let validWithModifierAndNegativeAndImportant =
  "<h2>Valid with modifiers, important and negative flags</h2>\n";

let invalid = "<h2>Invalid</h2>\n";
let invalidWithNegative = "<h2>Invalid with negative</h2>\n";
let invalidWithImportant = "<h2>Invalid important</h2>\n";
let invalidWithModifier = "<h2>Invalid with modifiers</h2>\n";
let invalidWithModifierAndNegative =
  "<h2>Invalid with modifiers and negative</h2>\n";
let invalidWithModifierAndImportant =
  "<h2>Invalid with modifiers and important</h2>\n";
let invalidWithModifierAndNegativeAndImportant =
  "<h2>Invalid with modifiers, important and negative flags</h2>\n";

for (const { logical } of logicalProperties) {
  valid += `<div className="${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { logical } of logicalProperties) {
  validWithNegative += `<div className="-${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { logical } of logicalProperties) {
  validWithImportant += `<div className="!${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { logical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  validWithModifier += `<div className="${modifier}:${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { logical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  validWithModifierAndNegative += `<div className="${modifier}:-${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { logical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  validWithModifierAndImportant += `<div className="${modifier}:!${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { logical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  validWithModifierAndNegativeAndImportant += `<div className="${modifier}:!-${logical}${logical.endsWith("-") ? "8" : ""}" />\n`;
}

// Invalid
for (const { physical } of logicalProperties) {
  invalid += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { physical } of logicalProperties) {
  invalidWithNegative += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="-${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { physical } of logicalProperties) {
  invalidWithImportant += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="!${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { physical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  invalidWithModifier += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="${modifier}:${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { physical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  invalidWithModifierAndNegative += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="${modifier}:-${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { physical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  invalidWithModifierAndImportant += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="${modifier}:!${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

for (const { physical } of logicalProperties) {
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  invalidWithModifierAndNegativeAndImportant += `{/* eslint-disable-next-line rtl-friendly/no-physical-properties */}\n<div className="${modifier}:!-${physical}${physical.endsWith("-") ? "8" : ""}" />\n`;
}

await mkdir(path.join(process.cwd(), "e2e"), { recursive: true });
await writeFile(
  path.join(process.cwd(), "e2e", "no-physical-properties.tsx"),
  `
declare const React;

<>
  <>${valid}</>
  
  <>${validWithNegative}</>
  
  <>${validWithImportant}</>
  
  <>${validWithModifier}</>
  
  <>${validWithModifierAndNegative}</>
  
  <>${validWithModifierAndImportant}</>
  
  <>${validWithModifierAndNegativeAndImportant}</>
  
  <>${invalid}</>
  
  <>${invalidWithNegative}</>
  
  <>${invalidWithImportant}</>
  
  <>${invalidWithModifier}</>
  
  <>${invalidWithModifierAndNegative}</>
  
  <>${invalidWithModifierAndImportant}</>
  
  <>${invalidWithModifierAndNegativeAndImportant}</>
</>
`
);

exec("biome check e2e --write")