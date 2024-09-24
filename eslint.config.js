// eslint.config.js
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
    ignores: ['dist', 'node_modules'], // Ensure these patterns don't conflict
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
    },
    globals: {
        logger: 'readonly',
    },
});
