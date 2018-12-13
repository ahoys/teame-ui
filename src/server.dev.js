const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const compiler = webpack([
  require('../webpack/config.dev.client'),
  require('../webpack/config.dev.server'),
])

const server = express()

server.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
  })
)

server.use(webpackHotServerMiddleware(compiler))

server.listen(3000, () => {
  console.log('Building files and then ready at localhost:3000...')
})
