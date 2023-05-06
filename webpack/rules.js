const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default
const { compact } = require('lodash')

const tsImportTransformer = tsImportPluginFactory({
  libraryName: 'lodash',
  libraryDirectory: '',
  camel2DashComponentName: false,
})
// const styledComponentsTransformer = createStyledComponentsTransformer()

const tsOptions = (isDev) => isDev ? {
  getCustomTransformers: () => ({
    before: [
      // styledComponentsTransformer,
    ],
  }),
} : {
  getCustomTransformers: () => ({
    before: [
      tsImportTransformer,
    ],
  }),
  ignoreDiagnostics: [],
}

module.exports = (isDev) => compact([
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
