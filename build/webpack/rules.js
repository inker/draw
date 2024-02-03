const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

// const styledComponentsTransformer = createStyledComponentsTransformer()

/**
 * @typedef {NonNullable<import('webpack').Configuration['module']>['rules']} Rules
 *
 * @param {boolean} isDev
 * @returns {Rules}
 */
module.exports = isDev =>
  [
    {
      test: /\.tsx?$/,
      use: {
        loader: require.resolve('esbuild-loader'),
        options: {
          target: 'es2021',
        },
      },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        require.resolve('css-loader'),
      ],
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
