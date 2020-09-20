const { compact } = require('lodash')

const tsOptions = (isDev) => isDev ? {
} : {
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
    use: [
      {
        loader: 'ts-loader',
        options: tsOptions(isDev),
      },
      {
        loader: 'babel-loader',
      },
    ],
    exclude: /node_modules/,
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
    include: [
      /node_modules/,
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
