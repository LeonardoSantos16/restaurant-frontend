import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactX from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'public/mockServiceWorker.js',
      '.github/skills',
      '.claude',
    ],
  },
  js.configs.recommended,
  // Node env for config files
  {
    files: ['*.config.ts', '*.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  // App source + tests
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    ...reactX.configs['recommended-typescript'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: {
      ...reactX.configs['recommended-typescript'].plugins,
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...reactX.configs['recommended-typescript'].rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-use-context': 'off',
    },
  },
  prettierConfig,
];
