const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default
const { compact } = require('lodash')

// const styledComponentsTransformer = createStyledComponentsTransformer()

module.exports = (isDev) => compact([
  {
    test: /\.tsx?$/,
    use: {
      loader: 'esbuild-loader',
      options: {
        target: 'es2021',
      },
    },
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
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
])
