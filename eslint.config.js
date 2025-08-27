// eslint.config.js (or .mjs)
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 0) Ignore files that aren’t meant to be linted
  {
    ignores: [
      'dist',
      'build',
      'coverage',
      'node_modules',
      'eslint.config.*',
      'vite.config.*',
      'setupTests.ts',
      'prettier.config.*',
    ],
  },

  // 1) Base JS
  eslint.configs.recommended,

  // 2) TS + typed rules
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  // 3) Tell the parser how to find your tsconfigs (enables “typed linting”)
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // 4) React and app rules (only for TS files)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'react/react-in-jsx-scope': 'off',

      // hygiene
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/await-thenable': 'error', // (already on via recommendedTypeChecked)

      'prettier/prettier': 'error', // runs Prettier as a rule
    },
  },

  // 5) Disable rules for testing only
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },

  // 6) Let Prettier handle formatting (turns off conflicting style rules)
  prettier,
);
