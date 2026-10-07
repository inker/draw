/**
 * @typedef {NonNullable<import('@rspack/core').Configuration['module']>['rules']} Rules
 *
 * @param {boolean} isDev
 * @returns {Rules}
 */
module.exports = isDev =>
  [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: {
        loader: 'builtin:swc-loader',
        options: {
          detectSyntax: 'auto',
          jsc: {
            target: 'es2021',
            // swc doesn't read tsconfig.json,
            // so its "jsx": "react-jsx" has to be repeated here.
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      type: 'css',
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /\.module\.s[ac]ss$/,
      // Compiles Sass to CSS
      use: require.resolve('sass-loader'),
      type: 'css',
    },
    {
      test: /\.module\.s[ac]ss$/i,
      // Compiles Sass to CSS
      use: require.resolve('sass-loader'),
      type: 'css/module',
      parser: {
        // Left on, these rename custom properties & other names as well as classes,
        // which breaks variables shared between files
        // or set from JS (like --team-width).
        dashedIdents: false,
        customIdents: false,
        grid: false,
        container: false,
        function: false,
      },
      generator: {
        localIdentName: '[folder]__[local]__[hash:5]',
      },
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: `images/[name]${isDev ? '' : '.[contenthash:8]'}[ext]`,
      },
    },
    {
      test: /\.txt$/,
      type: 'asset/source',
      generator: {
        filename: `data/[name]${isDev ? '' : '.[contenthash:8]'}[ext]`,
      },
    },
  ].filter(Boolean);
