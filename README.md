# eslint-plugin-rtl-friendly (Canary)

Helps you write code that works the same for both LTR and RTL languages.

> [!IMPORTANT]
> Until `1.0.0` is released, this plugin is in Beta.

<div align="center">

[![npm version](https://img.shields.io/npm/v/eslint-plugin-rtl-friendly.svg)](https://www.npmjs.com/package/eslint-plugin-rtl-friendly)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-rtl-friendly.svg)](http://www.npmtrends.com/eslint-plugin-rtl-friendly)
[![CI](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/actions/workflows/ci.yml/badge.svg)](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/actions/workflows/ci.yml)

<!-- [![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-rtl-friendly.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-rtl-friendly)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-rtl-friendly/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-rtl-friendly) -->

</div>

<details>
<summary
  style="font-size: 1.5em; font-weight: bold; margin-block: 1em;"
>Why RTL matters? <span style="font-size: 0.5em; font-weight: normal;">(Click to expand)</span></summary>

With a global audience of over 800 million people who speak right-to-left (RTL) languages, ensuring RTL readability is essential for international web apps. The **eslint-plugin-rtl-friendly** is a linter that helps you write RTL-friendly code.

## Why RTL matters?

```md
You read this text from left to right.
```

However, texts in RTL languages are read from right to left.

<div class="highlight highlight-text-md">
<pre dir="rtl">
هذا النص يُقرأ من اليمين إلى اليسار.
</pre>
</div>

Notice how GitHub's markdown aligns the text to the right. This isn’t a bug—it's how RTL languages are read.

Imagine you're writing code the traditional way, creating a button with text and an icon:

```jsx
return (
  <button>
    <CheckIcon className="mr-2" />
    <span>{getTranslation("buttons.done")}</span>
  </button>
);
```

The code above will work fine for LTR languages, but for RTL languages, the icon will appear on the right side of the text, just like the margin (`mr-2`). This means there will be no space between the icon and the text, and there will be extra space at the start of the button.

```jsx
LTR: [{icon} {text}]
RTL: [{text}{icon} ]
```

The solution is to use `me-2` instead of `mr-2`. `me-2` stands for `margin-inline-end`, which means "right" in LTR languages and "left" in RTL languages. The updated code should be:

```jsx
return (
  <button>
    <CheckIcon className="me-2" />
    <span>{getTranslation("buttons.done")}</span>
  </button>
);
```

## RTL languages:

- (ar) Arabic - العربية
- (arc) Aramaic - ܐܪܡܝܐ
- (ckb) Sorani Kurdish - کوردی
- (dv) Divehi - ދިވެހިބަސް
- (fa) Persian - فارسی
- (ha) Hausa - هَوُسَ
- (he) Hebrew - עברית
- (khw) Khowar - کھوار
- (ks) Kashmiri - कॉशुर
- (ps) Pashto - پښتو
- (sd) Sindhi - سنڌي
- (ur) Urdu - اردو
- (uz-Af) Uzbeki Afghanistan - ازبیک
- (yi) Yiddish - ייִדיש

> The orange areas on the map below show where RTL languages are spoken.  
> ![map](/.github/assets/languages-map.png)

</details>

Currently, the plugin has [one rule](/src/rules/no-phyisical-properties/README.md) for Tailwind classes (Feel free to contribute!). It reports and auto-fixes the usage of physical properties classes to their [logical counterparts](https://tailwindcss.com/blog/tailwindcss-v3-3#simplified-rtl-support-with-logical-properties).

![demo](/.github/assets/vscode-demo.png)

The plugin comes with `--fix` support out of the box. Run `eslint . --fix` and it will automatically fix the issues regardless of how your classes are written. as simple as `className="pl-1 mr-2"` or `className={clsx(some && "ps-1", {"me-2": isOpen})}` or even referencing a variable `className={variable}` (It will report where variable is declared). Have a look at [this test file](/src/rules/no-phyisical-properties/test.ts) to see what it can fix and what it won't. If you find a case that it doesn't handle, please [open an issue](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/issues/new).

## Installation

```bash
$ pnpm add -D eslint-plugin-rtl-friendly]
```

### Requirements

- ESLint >= V9 (Flat Config)
- Tailwindcss [V3.3.0](https://tailwindcss.com/blog/tailwindcss-v3-3#simplified-rtl-support-with-logical-properties) or higher

```js
import rtlFriendly from "eslint-plugin-rtl-friendly";

export default [
  // ...
  rtlFriendly.configs.recommended,
  // More aggressive?
  {
    rules: {
      "rtl-friendly/no-physical-properties": "error",
    },
  },
];
```

### Rules

| Rule ID                                                                       | `--fix` support |
| :---------------------------------------------------------------------------- | :-------------: |
| [rtl-friendly/no-physical-properties](./docs/rules/no-physical-properties.md) |       ✅        |

<!--RULE_TABLE_END-->

## Contributing

Welcome your contribution!

## TODO:

- [x] Tailwindcss physical properties to logical properties
- [x] Add support for advanced className like `cn('pl-2', {...})`
- [ ] Add support for Template Literals tw`... ${...}`
- [ ] New rule: `dir-attribute` to enforce `dir` in `<html>` and `<code>` tags
- [ ] `letter-spacing` doesn't work well with RTL languages to disable it in rtl languages, we should warn to disable it in rtl `rtl:***` (NOT SURE) - some other cases like `absolute start-0 -translate-x-1/2` - `space-x-*`
- [Resources](https://rtlstyling.com/posts/rtl-styling)
