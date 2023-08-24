# eslint-plugin-rtl-friendly

<div align="center">

[![npm version](https://img.shields.io/npm/v/eslint-plugin-rtl-friendly.svg)](https://www.npmjs.com/package/eslint-plugin-rtl-friendly)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-rtl-friendly.svg)](http://www.npmtrends.com/eslint-plugin-rtl-friendly)

<!-- [![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-rtl-friendly.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-rtl-friendly)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-rtl-friendly/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-rtl-friendly) -->

</div>

With a global audience that includes over 800 million people speaking right-to-left (RTL) languages, catering to RTL readability is crucial for international web apps. The **eslint-plugin-rtl-friendly** is a linter that helps you write RTL-friendly code.

## Why does RTL matter?

```md
You read this text from left to right.
```

However, texts in RTL languages are read from right to left.

<div class="highlight highlight-text-md">
<pre dir="rtl">
هذا النص يُقرأ من اليمين إلى اليسار.
</pre>
</div>

Notice how GitHub's markdown aligns the text to the right. It's not a bug; that's how RTL languages are read.

Let's imagine you're writing code using the old way, and you're, for example, creating a button with text and an icon:

```jsx
return (
  <button>
    <CheckIcon className="mr-2" />
    <span>{getTranslation('buttons.done')}</span>
  </button>
);
```

The previous code will work fine for LTR languages, but for RTL languages, the icon will be on the right side of the text, just like the margin (mr-2), which means there won't be any space between the icon and the text and extra space at the beggining of the button.

```jsx
LTR: [{icon} {text}]
RTL: [{text}{icon} ]
```

The trick here is to use `me-2` instead of `mr-2`. `me-2` stands for `margin-inline-end`, which means right in LTR languages and left in RTL languages. So, the code should be:

```jsx
return (
  <button>
    <CheckIcon className="me-2" />
    <span>{getTranslation('buttons.done')}</span>
  </button>
);
```

Up to this point, this plugin only reports a warning (with auto-fix) when using tailwindcss physical properties like `pl-*`, `mr-*`, `text-left`, `left-*`, `border-l-*`, `rounded-r-*`, etc. Instead, you should use their logical properties like `ps-*`, `ms-*`, `text-start`, `start-*`, `border-start-*`, `rounded-start-*`, etc. You can read more about [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) or [tailwindcss RTL support](https://tailwindcss.com/docs/rtl#rtl-support-in-tailwind-css) or [our documentation](./docs/rules/no-physical-properties.md).


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
> ![map](/assets/languages-map.png)

## Installation

```bash
# using pnpm
$ pnpm add -D eslint eslint-plugin-rtl-friendly
# using yarn
$ yarn add -D eslint eslint-plugin-rtl-friendly
# using npm
$ npm install --save-dev eslint eslint-plugin-rtl-friendly
```

### Requirements

- ESLint
- Tailwindcss [V3.3.0](https://tailwindcss.com/blog/tailwindcss-v3-3#simplified-rtl-support-with-logical-properties) or higher

## Usage

Write your config file such as `.eslintrc.js`.

```js
module.exports = {
  // ...
  plugins: ['rtl-friendly'],
  // extend our recommended config
  extends: ['plugin:rtl-friendly/recommended'],
  // or add the rules you want to use
  rules: {
    'rtl-friendly/no-physical-properties': 'warn',
  },
  // ...
};
```

See [next.js example](./examples/next.js/.eslintrc.js)

See also [Configuring ESLint](https://eslint.org/docs/user-guide/configuring).

## Configs

- `rtl-friendly/recommended` ... enables the recommended rules.

## Rules

<!--RULE_TABLE_BEGIN-->

### suggestion

| Rule ID                                                                       | Description                              |       |
| :---------------------------------------------------------------------------- | :--------------------------------------- | :---: |
| [rtl-friendly/no-physical-properties](./docs/rules/no-physical-properties.md) | Encourage the use of RTL-friendly styles | ⭐️✒️ |

<!--RULE_TABLE_END-->

## Contributing

Welcome your contribution!

## TODO:

- [x] Tailwindcss physical properties to logical properties
- [ ] Strict `<html>` to have dir attribute depending on a codition or whatever detecting the language
- [ ] Strict `<code>` to have `dir="ltr"` to override the parent's direction
- [ ] in the future maybe throw a warning that `letter-spacing` doesn't work well with RTL languages to disable it in rtl `rtl:***` (NOT SURE)
- [ ] text-opacity like the previous one
- [Some resources](https://rtlstyling.com/posts/rtl-styling)
