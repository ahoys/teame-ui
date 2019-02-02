const path = require('path')
const webpack = require('webpack')
const dist = path.resolve(__dirname, '../dist')
const src = path.resolve(__dirname, '../src')

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, '../src/Client.tsx'),
  output: {
    filename: 'client.js',
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
      actions: `${src}/components`,
      components: `${src}/components`,
      containers: `${src}/containers`,
      dist,
      reducers: `${src}/reducers`,
      types: `${src}/types.d.ts`,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    // Servers should not split.
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
}
