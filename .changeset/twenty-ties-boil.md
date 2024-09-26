---
"eslint-plugin-rtl-friendly": minor
---

Look for Identifier decleration

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
