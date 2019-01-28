const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const base64 = require('base-64');
const fetch = require('node-fetch');
const compiler = webpack([
  require('../webpack/config.dev.client'),
  require('../webpack/config.dev.server'),
])

const server = express()

server.get('/protected/route/basic', (req, res) => {
  req.headers.Authorization = 'Basic ' + base64.encode('example1:example1');
  fetch('http://localhost:8080/protected/route/basic', {
    method: 'GET',
    headers: req.headers,
    mode: 'no-cors',
  })
  .then(backRes => backRes.json())
  .then((backRes) => {
    res.send(backRes);
  });
})

server.post('/graphql', (req, res) => {
  const query = '{ users { password }}';
  fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: query,
    mode: 'no-cors',
  })
  .then(backRes => backRes.json())
  .then((backRes) => {
    res.send(backRes);
  });
})

server.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
  })
)

server.use(webpackHotServerMiddleware(compiler))

server.listen(3000, () => {
  console.log('Building files and then ready at localhost:3000...')
})
