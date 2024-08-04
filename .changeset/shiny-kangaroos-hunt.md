---
"eslint-plugin-rtl-friendly": minor
---

# Add support for extra className cases

Previously the plugin only supported literal values like `className="..."`, which lead to a big miss, Now it supports more cases:

- `className={"..."}` (Auto Fixable)
- Template Literal: `className={``}` (Auto Fixable)
- Terenary Operator: `className={condition ? "..." : "..."}`:
  - It reports errors on both consequent and alternate values
  - But it only fixes the consequent value


Currently, Auto Fixing only works with literal values but it will support all cases in the future
