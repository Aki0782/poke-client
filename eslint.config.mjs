import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts, tsx, jsx}"]
    // Specifies the file patterns that ESLint should target.
  },
  {
    languageOptions: { globals: globals.browser }
    // Sets the global variables for a browser environment, so ESLint knows about common browser globals like `window` and `document`.
  },
  pluginJs.configs.recommended,
  // Applies the recommended ESLint configuration for JavaScript.

  ...tseslint.configs.recommended,
  // Spreads in the recommended TypeScript ESLint configurations.

  eslintPluginPrettierRecommended,
  // Integrates Prettier with ESLint, using the recommended settings from `eslint-plugin-prettier`.

  pluginReact.configs.flat.recommended,
  // Applies the recommended configuration for React with the new flat configuration structure.

  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
          // Configures the resolver for TypeScript, pointing to the `tsconfig.json` file.
        },
        node: {
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
          // Specifies the file extensions that the Node.js resolver should handle.
        }
      },
      react: {
        version: "detect"
        // Automatically detects the React version to apply the appropriate linting rules.
      }
    },
    plugins: {
      import: importPlugin
      // Enables the `eslint-plugin-import` plugin to manage import/export syntax and module resolution.
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          tabWidth: 2,
          endOfLine: "lf",
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: "always",
          singleQuote: false,
          printWidth: 80,
          singleAttributePerLine: true,
          trailingComma: "none"
          // Custom Prettier rules for code formatting, enforced via ESLint.
        }
      ],
      "array-callback-return": [
        "error",
        {
          allowImplicit: true,
          checkForEach: true
        }
      ],
      // Ensures that array methods with callbacks (e.g., `map`, `filter`) always return a value.

      "default-case": "error",
      // Requires a `default` case in `switch` statements.

      "prefer-const": "error",
      // Enforces the use of `const` for variables that are never reassigned.

      "prefer-destructuring": "error",
      // Enforces destructuring of arrays and objects for assignment.

      "func-names": ["error", "always"],
      // Requires named functions, avoiding anonymous function expressions.

      "prefer-arrow-callback": "error",
      // Enforces the use of arrow functions as callbacks where appropriate.

      "object-curly-spacing": ["error", "always"],
      // Enforces consistent spacing inside curly braces.

      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"]
        },
        { blankLine: "always", prev: "if", next: "if" }
        // Enforces padding lines between statements for better readability.
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          pathGroups: [
            {
              pattern: "Api/**",
              group: "internal",
              position: "after"
            },
            {
              pattern: "Constants/**",
              group: "internal",
              position: "after"
            },
            {
              pattern: "Components/**",
              group: "internal",
              position: "after"
            },
            {
              pattern: "Callbacks/**",
              group: "internal",
              position: "after"
            },
            {
              pattern: "Utils/**",
              group: "internal",
              position: "after"
            },
            {
              pattern: "Hooks/**",
              group: "internal",
              position: "after"
            },
            {
              pattern: "Utils/**",
              group: "internal",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"]
          // Enforces import order and grouping, with specific patterns for internal modules.
        }
      ],
      "react/react-in-jsx-scope": "off"
      // Disables the rule that requires React to be in scope when using JSX, which is unnecessary in React 17+.
    }
  }
];
