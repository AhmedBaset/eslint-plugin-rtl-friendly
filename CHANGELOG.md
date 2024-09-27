# Changelog

## 0.4.0

### Minor Changes

- [#60](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/60) [`affc583`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/affc583c48778feea27ff068eaa7ae068e8920c3) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - Add auto-fixing for ternary operator

- [#61](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/61) [`07bbde9`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/07bbde9c715792954c5af91f7426bda66bea5bf7) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - feat: CallExpression, ArrayExpression, ObjectExpression

- [#66](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/66) [`7fb8f4f`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/7fb8f4f7b806c79a8e892632e4321ec6a575149b) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - feat: Support BinaryExpression `"..." + "..."`

- [#57](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/57) [`9c85bbb`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/9c85bbb0e288ade8a470282ab7a63c6f52bab613) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - # Add support for extra className cases

  Previously the plugin only supported literal values like `className="..."`, which lead to a big miss, Now it supports more cases:

  - `className={"..."}` (Auto Fixable)
  - Template Literal: ` className={``} ` (Auto Fixable)
  - Terenary Operator: `className={condition ? "..." : "..."}`:
    - It reports errors on both consequent and alternate values
    - But it only fixes the consequent value

  Currently, Auto Fixing works with only literal values but the goal is to get it to fix all expressions

- [#67](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/67) [`8e6c4ca`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/8e6c4ca519e66611262732e6dbaa5179b1f30980) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - Support TaggedTemplate ("tw\`...`")

  - tw\`...\` is supported but tw\`... ${...}\` is not yet

- [#70](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/70) [`c1bbde2`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/c1bbde25668f3ff8b494a2d47a362aa6c3b717cf) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - Look for Identifier decleration

  ```js
  const a = "text-left";
  //         ^^^^^^^^^
  return <div className={a} />;
  ```

  Or even if it's assigned to another variable

  ```js
  const a = "text-left";
  //         ^^^^^^^^^
  const b = a;
  return <div className={b} />;
  ```

- [#90](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/90) [`f7fa50a`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/f7fa50a8bab6f1ca648c270c6abb745cb1118566) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - Add option `allowPhysicalInsetWithAbsolute` to allow the use of `left-1/2` with `fixed -translate-x-1/2`

  Add option `debug`

### Patch Changes

- [#54](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/54) [`b305432`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/b305432125e5b911085cc6c1ade88cb2ea3f8111) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - Restructure the codebase:

  - Integrate Changeset to document the updates.
  - Move rule definition, its tests, and docs to a folder in `src/rules` instead of the horizontal structure.

- [#63](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/pull/63) [`6b98d59`](https://github.com/AhmedBaset/eslint-plugin-rtl-friendly/commit/6b98d5904908fb023c763393a3f66e0836c20700) Thanks [@AhmedBaset](https://github.com/AhmedBaset)! - Vitest instead of Jest

## [0.2.0] - 2023-09-08

### Fixed

- `no-physical-properties` rule now correctly handles classes with !important like `!pl-1` flag and modifiers like `hover:` (#1)

## [0.1.0] - 2023-08-24

### Added

- `no-physical-properties` rule
