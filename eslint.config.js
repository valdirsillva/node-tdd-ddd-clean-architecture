import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default defineConfig([
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    ignores: [
      '**/*.config.js',
      '!**/eslint.config.js',
      'node_modules/**',
      'build/**'
    ],
    rules: {
      indent: ['error', 2],
      semi: ['error', 'never'],
      'import/no-named-as-default': 0
    }
  }
]);
