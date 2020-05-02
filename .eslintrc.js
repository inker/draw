module.exports = {
  extends: [
    'eslint-config-airbnb',
    '@inker/eslint-config',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
  ],

  plugins: [
    // 'import',
    '@typescript-eslint',
  ],

  parser: '@typescript-eslint/parser',

  settings: {
    // Append 'ts' extensions to Airbnb 'import/resolver' setting
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
      node: {
        extensions: [
          '.mjs',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        webpack: {
          'config': 'webpack/webpack.config.js',
        },
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.mjs',
    ],
  },

  rules: {
    'object-property-newline': [2, {
      allowAllPropertiesOnSameLine: false,
    }],

    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [2, {
      extensions: [
        '.jsx',
        '.tsx',
      ],
    }],

    '@typescript-eslint/no-unused-vars': [2, {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
    }],
  },

  globals: {
    __DEV__: true,
    __SSR__: true,
  },
}
