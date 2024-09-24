module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'eslint:recommended',              // Use recommended rules from ESLint
        'plugin:@typescript-eslint/recommended', // Recommended rules from @typescript-eslint
        'plugin:prettier/recommended'      // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
    ],
    parserOptions: {
        ecmaVersion: 2020,                 // Allows the use of modern ECMAScript features
        sourceType: 'module',              // Allows for the use of imports
    },
    rules: {
        'prettier/prettier': 'warn',       // Prettier errors will display as warnings
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
    },
    globals: {
        "logger": "readonly"
    }
};
