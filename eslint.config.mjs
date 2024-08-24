import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts},.component.ts"],
    rules:{
     "@angular-eslint/prefer-standalone-component": [
      "error"
    ]
    }
  },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
];
