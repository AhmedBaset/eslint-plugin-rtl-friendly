# rtl-friendly/no-physical-properties

> Encourage the use of RTL-friendly styles
>
> - ⭐️ This rule is included in `plugin:rtl-friendly/recommended` preset.
> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix all of the problems reported by this rule.

This rule enforces the use of css logical properties instead of physical properties. This rule ensures that your code will work well in RTL languages as well as LTR languages.

## Examples of incorrect code for this rule:

```jsx
<div className="ml-1 !mr-2 sm:pl-8 hover:pr-2 data-[state=active]:left-0 hover:!right-12 text-left border-l-2 rounded-l-sm"></div>
```

## Examples of correct code for this rule:

```jsx
<div className="ms-1 !me-2 sm:ps-8 hover:pe-2 data-[state=active]:start-0 hover:!end-12 text-start border-s-2 rounded-s-sm"></div>
```

## To automatically fix all of the problems reported by this rule

- In VS Code, press `Quick Fix` (`Ctrl` + `.`) on the error line.
- On the command line, run `eslint --fix`.

## Rule Details

This rule checks if you are using any of the [tailwindcss physical properties](./../../src/configs/tw-logical-properties.ts) and suggests the use of its logical counterpart.

## Options

There are no options for this rule yet. If you have any ideas, please [create an issue](https://github.com/a7med3bdulbaset/eslint-plugin-rtl-friendly/issues/new).

## Implementation

- [Rule source](../../src/rules/no-physical-properties.ts)
- [Test source](../../tests/rules/no-physical-properties.ts)
