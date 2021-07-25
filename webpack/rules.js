const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { createLodashTransformer } = require('typescript-plugin-lodash')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default
const { compact } = require('lodash')

const lodashTransformer = createLodashTransformer()
const styledComponentsTransformer = createStyledComponentsTransformer()

const tsOptions = (isDev) => isDev ? {
  getCustomTransformers: () => ({
    before: [
      styledComponentsTransformer,
    ],
  }),
} : {
  getCustomTransformers: () => ({
    before: [
      lodashTransformer,
    ],
  }),
  ignoreDiagnostics: [],
}

module.exports = (isDev) => compact([
  {
    test: /worker\.[jt]s/,
    use: {
      loader: 'worker-loader',
      options: {
        // TODO: Multiple assets emit different content to the same filename
        filename: 'workers/[name].[contenthash].js',
      },
    },
  },
  {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: tsOptions(isDev),
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
      filename: `images/[name]${isDev ? '' : '.[contenthash]'}[ext]`,
    },
  },
  {
    test: /\.txt$/,
    type: 'asset/source',
    generator: {
      filename: `data/[name]${isDev ? '' : '.[contenthash]'}[ext]`,
    },
  },
])
