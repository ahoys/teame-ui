const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const root = path.resolve(__dirname, '../')
const dist = path.resolve(__dirname, '../dist')
const src = path.resolve(__dirname, '../src')

module.exports = {
  mode: 'production',
  name: 'client',
  target: 'web',
  devtool: 'nosources-source-map',
  entry: `${src}/Client.tsx`,
  output: {
    path: dist,
    // Hash so that we can safely cache.
    filename: 'client.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].client.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      components: `${src}/components`,
      dist,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    // Cleans the destination folder before building new.
    new CleanWebpackPlugin([dist], { root }),
    // Creates stats for code splitting.
    new StatsPlugin('stats.json'),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // With HTTP/2 it is better to have many small files versus one big.
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            return `yarn.${packageName.replace('@', '')}`
          },
        },
      },
    },
  },
}
