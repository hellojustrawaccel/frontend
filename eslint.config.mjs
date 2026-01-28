import { fixupPluginRules } from '@eslint/compat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import _import from 'eslint-plugin-import';
import onlyError from 'eslint-plugin-only-error';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      '@typescript-eslint': fixupPluginRules(tseslint),
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(_import),
      'only-error': onlyError,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'import/exports-last': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],

    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
]);

export default eslintConfig;
