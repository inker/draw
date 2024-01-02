module.exports = {
  extends: [
    'eslint-config-airbnb',
    '@inker/eslint-config-typescript',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
  ],

  plugins: [
    // 'import',
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
          config: 'webpack/webpack.config.js',
        },
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },

  rules: {
    // TODO: remove (formatting)
    indent: 0,
    'function-paren-newline': 0,
    'no-extra-semi': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react/jsx-wrap-multilines': 0,

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
        'newlines-between': 'always-and-inside-groups',
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
}
