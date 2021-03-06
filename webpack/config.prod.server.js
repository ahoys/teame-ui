const path = require('path')
const webpack = require('webpack')

// Root paths.
const dist = path.resolve(__dirname, '../dist')
const src = path.resolve(__dirname, '../src')

module.exports = {
  mode: 'production',
  name: 'server',
  target: 'node',
  devtool: 'nosources-source-map',
  entry: `${src}/server.prod.ts`,
  output: {
    path: dist,
    filename: 'server.js',
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
      containers: `${src}/containers`,
      contexts: `${src}/contexts`,
      dist,
      services: `${src}/services`,
      types: `${src}/types.d.ts`,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    // To avoid warnings in builds.
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    // Don't split server code.
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
}
