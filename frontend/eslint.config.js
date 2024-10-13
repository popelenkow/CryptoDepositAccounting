import eslint from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import-x';
import tsEslint from 'typescript-eslint';

export default tsEslint.config({
  extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2023,
    globals: globals.browser,
  },
  plugins: {
    'import-x': importPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefreshPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import-x/resolver': {
      typescript: true,
    },
  },
  rules: {
    ...importPlugin.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'func-style': ['error'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'never',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-useless-constructor': ['error'],
    'func-names': ['error'],
    'func-style': ['error'],
    'import-x/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
  },
});
