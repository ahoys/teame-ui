const path = require('path')
const webpack = require('webpack')
const dist = path.resolve(__dirname, '../dist')
const src = path.resolve(__dirname, '../src')

module.exports = {
  name: 'server',
  mode: 'development',
  target: 'node',
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, '../src/renderer.tsx'),
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
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
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    // To avoid warnings in builds.
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    // Servers should not split.
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
}
