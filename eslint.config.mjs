// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import n from 'eslint-plugin-n'; // вместо eslint-plugin-node
import globals from 'globals';

export default [
    // Игноры
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.next/**',
            '**/coverage/**',
            '**/.husky/**',
        ],
    },

    // Базовые рекомендованные
    js.configs.recommended,

    // TypeScript (без type-aware). Если хочешь строгий режим — см. ниже блок "Type-aware".
    ...tseslint.configs.recommended,

    // Общие правила для всего репо
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            import: importPlugin,
            'jsx-a11y': jsxA11y,
            n, // плагин для Node
        },
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.es2024,
            },
        },
        settings: {
            react: { version: 'detect' },
            // ВАЖНО: резолвинг TS-путей и алиасов для import-plugin
            'import/resolver': {
                typescript: {
                    // перечисли проекты, чтобы и фронт, и бэк резолвились
                    project: [
                        './tsconfig.json',
                        './frontend/tsconfig.json',
                        './backend/tsconfig.json',
                    ],
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            // TS и общие
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'no-undef': 'off',

            // React
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Import hygiene
            'import/no-unresolved': 'error',
            'import/order': [
                'warn',
                {
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'type',
                    ],
                },
            ],
            'import/extensions': ['warn', 'ignorePackages'],
        },
    },

    // Фронтенд (Vite/React): browser-глобалы
    {
        files: ['frontend/**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2024,
            },
        },
        rules: {
            // при необходимости спец-правила для фронта
        },
    },

    // Бэкенд (Node/Express): node-глобалы + плагин n
    {
        files: ['backend/**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2024,
            },
        },
        rules: {
            'n/no-unsupported-features/es-builtins': 'off',
            'n/no-missing-import': 'off', // чтобы не конфликтовало с import/no-unresolved
        },
    },

    // ---- Type-aware (опционально, если хочешь строгую проверку типов) ----
    // {
    //   files: ['**/*.{ts,tsx}'],
    //   ...tseslint.configs.recommendedTypeChecked,
    //   languageOptions: {
    //     parser: tseslint.parser,
    //     parserOptions: {
    //       project: ['./tsconfig.json', './frontend/tsconfig.json', './backend/tsconfig.json'],
    //       tsconfigRootDir: new URL('.', import.meta.url).pathname,
    //     },
    //   },
    //   rules: {
    //     // сюда можно добавить более строгие TS-правила
    //   },
    // },
];
