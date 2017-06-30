const tsDev = 'awesome-typescript-loader'

const tsProd = {
  loader: tsDev,
  options: {
    ignoreDiagnostics: [2403, 2300, 2451, 2307, 2345, 2339, 2305, 2459, 2322], // 2305 is temporary
  },
}

module.exports = env => [
  {
    test: /\.tsx?$/,
    use: env === 'dev' ? tsDev : tsProd,
  },
  { // global
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    },
  },
]
