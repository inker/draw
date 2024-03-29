module.exports = {
  extends: [
    'eslint-config-airbnb',
    '@inker/eslint-config-typescript',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    'prettier',
  ],

  plugins: [
    // 'import',
    'react-hooks',
    '@typescript-eslint',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    jsxPragma: null,
  },

  settings: {
    // Append 'ts' extensions to Airbnb 'import/resolver' setting
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        // always try to resolve types under `<roo/>@types` directory
        // even if it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
        webpack: {
          config: 'build/webpack.config.js',
        },
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },

  rules: {
    curly: [2, 'all'], // disabled by eslint-config-prettie
    'object-property-newline': [
      2,
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    // Only for ordering members
    'sort-imports': [
      2,
      {
        ignoreDeclarationSort: true,
      },
    ],

    'inker/enforce-import-name': [
      2,
      {
        paths: [
          {
            name: 'date-fns',
            importNames: [
              {
                imported: 'format',
                local: 'formatDate',
              },
              {
                imported: 'isValid',
                local: 'isDateValid',
              },
            ],
          },
          {
            name: 'lodash',
            importNames: [
              {
                imported: 'namespace',
                local: '_',
              },
              {
                imported: 'default',
                local: '_',
              },
            ],
          },
          {
            name: 'react',
            importNames: [
              {
                imported: 'default',
                local: 'React',
              },
            ],
          },
          {
            name: 'uuid',
            importNames: [
              {
                imported: 'v4',
                local: 'uuidv4',
              },
            ],
          },
          {
            pattern: '{,**,./,../,../../}/styles.module.{scss,css}',
            importNames: [
              {
                imported: 'default',
                local: 'styles',
              },
            ],
          },
        ],
      },
    ],
    'inker/no-true-as-default': 2,
    'inker/react-hooks-order': [
      2,
      {
        order: ['useDispatch', 'useSelector', 'useAbility', 'useNavigate'],
      },
    ],
    'inker/react-ref-name': 2,

    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        ts: 'never',
        jsx: 'never',
        tsx: 'never',
        vue: 'never',
      },
    ],

    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: './*.module.{css,scss,postcss}',
            group: 'sibling',
            position: 'after',
          },
        ],
        distinctGroup: false,
        pathGroupsExcludedImportTypes: ['react'],
        warnOnUnassignedImports: true,
      },
    ],

    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': [
      2,
      {
        disabledHooks: ['useEffect', 'useLayoutEffect'],
        staticHooks: {
          useAtom: [false, true],
          useDrawId: [false, true],
          useFastDraw: [false, true],
          usePopup: [false, true],
          useTheme: [false, true],
          useXRay: [false, true],
        },
      },
    ],

    '@typescript-eslint/array-type': 2,
    '@typescript-eslint/await-thenable': 2,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extra-parens': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-readonly': 2,
    // '@typescript-eslint/prefer-readonly-parameter-types': 2,
  },

  globals: {
    __DEV__: true,
    __SSR__: true,
  },

  overrides: [
    {
      files: ['tests/**/*'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tests/tsconfig.json'],
      },
      extends: ['plugin:vitest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [
          2,
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
        'vitest/prefer-comparison-matcher': 2,
        'vitest/prefer-equality-matcher': 2,
        'vitest/prefer-hooks-in-order': 2,
        'vitest/prefer-hooks-on-top': 2,
        'vitest/prefer-to-contain': 2,
        'vitest/prefer-to-have-length': 2,
      },
    },
  ],
};
