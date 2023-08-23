

This is a trial of [GitHub Repository Template](https://github.blog/2019-06-06-generate-new-repositories-with-repository-templates/).

Please update `package.json` after you created new repository with this template.

**File Structure**:

- `docs/rules/` is the directory to put documentation.
- `src/rules/` is the directory to put rule definitions.
- `scripts/` is the directory to put development scripts.
- `tests/` is the directory to put tests for `src/`.
- `.eslintignore` and `.eslintrc.js` are the configuration to lint this repository.

**Dependencies**:

This template uses [Jest](https://jestjs.io/) and [GitHub Actions](https://github.co.jp/features/actions) for tests, as same as ESLint itself. If you want to use other tools, customize it.

**Development Tools**:

- `npm run add-rule foo` command adds a rule definition.
- `npm update` command updates the following stuff by the `meta` property of rules:
  - the header of `docs/rules/*.md`.
  - `lib/configs/recommended.ts` file.
  - `lib/index.ts` file.
  - the rule table in `README.md` file.

Below is an example of README.

---

# eslint-plugin-rtl-friendly (template)

[![npm version](https://img.shields.io/npm/v/eslint-plugin-rtl-friendly.svg)](https://www.npmjs.com/package/eslint-plugin-rtl-friendly)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-rtl-friendly.svg)](http://www.npmtrends.com/eslint-plugin-rtl-friendly)
[![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-rtl-friendly.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-rtl-friendly)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-rtl-friendly/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-rtl-friendly)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-rtl-friendly.svg)](https://david-dm.org/mysticatea/eslint-plugin-rtl-friendly)

A template for ESLint plugins.

## Installation

Use [npm](https://www.npmjs.com/) or a compatibility tool to install.

```
$ npm install --save-dev eslint eslint-plugin-rtl-friendly
```

### Requirements

- Node.js v8.10.0 or newer versions.
- ESLint v5.16.0 or newer versions.

## Usage

Write your config file such as `.eslintrc.yml`.

```yml
plugins:
  - rtl-friendly
rules:
  rtl-friendly/example-rule: error
```

See also [Configuring ESLint](https://eslint.org/docs/user-guide/configuring).

## Configs

- `rtl-friendly/recommended` ... enables the recommended rules.

## Rules

<!--RULE_TABLE_BEGIN-->

### Stylistic Issues

| Rule ID                                                   | Description      |     |
| :-------------------------------------------------------- | :--------------- | :-: |
| [rtl-friendly/example-rule](./docs/rules/example-rule.md) | An example rule. | ⭐️ |

<!--RULE_TABLE_END-->

## Semantic Versioning Policy

This plugin follows [Semantic Versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## Changelog

- [GitHub Releases]()

## Contributing

Welcome your contribution!

See also [ESLint Contribution Guide](https://eslint.org/docs/developer-guide/contributing/).

### Development Tools

- `npm test` runs tests.
- `npm run update` updates the package version. And it updates `src/configs/recommended.ts`, `lib/index.ts`, and `README.md`'s rule table. See also [npm version CLI command](https://docs.npmjs.com/cli/version).
- `npm run add-rule <RULE_ID>` creates three files to add a new rule.
