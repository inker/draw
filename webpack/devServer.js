/**
 * @type {import('webpack-dev-server')}
 */
module.exports = {
  port: 9080,
  compress: false,
  devMiddleware: {
    stats: 'errors-warnings',
  },
  client: {
    overlay: false,
  },
  historyApiFallback: {
    rewrites: [
      {
        from: /./,
        to: '/404.html',
      },
    ],
  },
  hot: true,
  open: true,
}
