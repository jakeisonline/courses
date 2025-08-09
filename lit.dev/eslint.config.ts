import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import lit from "eslint-plugin-lit"
import globals from "globals"

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      "lit": lit,
    },
    rules: {
      // Disable rules that TypeScript already handles
      "@typescript-eslint/no-unused-vars": "off", // TypeScript handles this
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "*.js"],
  },
]
