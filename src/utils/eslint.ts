// /// <reference types="@typescript-eslint/scope-manager" />

// import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

// export function findVariable(
//   initialScope: TSESLint.Scope.Scope,
//   node: TSESTree.Identifier
// ) {
//   let scope: TSESLint.Scope.Scope | null = initialScope;
//   const name = node.name;

//   scope = getInnermostScope(scope, node);

//   while (scope != null) {
//     const variable = scope.set.get(name);
//     if (variable != null) {
//       return variable;
//     }
//     scope = scope.upper;
//   }

//   return null;
// }

// export function getInnermostScope(
//   initialScope: TSESLint.Scope.Scope,
//   node: TSESTree.Node
// ): TSESLint.Scope.Scope {
//   const location = node.range[0];

//   let scope = initialScope;
//   let found = false;
//   do {
//     found = false;
//     for (const childScope of scope.childScopes) {
//       const range = childScope.block.range;

//       if (range[0] <= location && location < range[1]) {
//         scope = childScope;
//         found = true;
//         break;
//       }
//     }
//   } while (found);

//   return scope;
// }
