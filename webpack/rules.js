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
        filename: '[name].[contenthash].worker.js',
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
      'style-loader',
      'css-loader',
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[hash:7].[ext]',
        outputPath: 'images',
      },
    },
  },
  {
    test: /\.txt$/,
    use: 'raw-loader',
  },
])
