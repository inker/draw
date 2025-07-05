const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

const getCssLoader = global => ({
  loader: require.resolve('css-loader'),
  options: global
    ? undefined
    : {
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
        importLoaders: 1,
      },
});

/**
 * @typedef {NonNullable<import('webpack').Configuration['module']>['rules']} Rules
 *
 * @param {boolean} isDev
 * @returns {Rules}
 */
module.exports = isDev =>
  [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
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
      exclude: /\.module\.css$/,
      use: [
        isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        require.resolve('css-loader'),
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /\.module\.s[ac]ss$/,
      use: [
        // Creates `style` nodes from JS strings
        require.resolve('style-loader'),
        // Translates CSS into CommonJS
        require.resolve('css-loader'),
        // Compiles Sass to CSS
        require.resolve('sass-loader'),
      ],
    },
    {
      test: /\.module\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        getCssLoader(false),
        // Compiles Sass to CSS
        require.resolve('sass-loader'),
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
