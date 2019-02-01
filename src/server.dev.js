const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const compiler = webpack([
  require('../webpack/config.dev.client'),
  require('../webpack/config.dev.server'),
]);
const { setLogDirPath } = require('logscribe');
setLogDirPath('./');
const setRoutesForServer = require('./routes');

const server = express()
setRoutesForServer(server);

// server.post('/graphql', (req, res) => {
//   const query = '{ users { password }}';
//   fetch('http://localhost:8080/graphql', {
//     method: 'POST',
//     body: query,
//     mode: 'no-cors',
//   })
//   .then(backRes => backRes.json())
//   .then((backRes) => {
//     res.send(backRes);
//   });
// })

server.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
  })
)

server.use(webpackHotServerMiddleware(compiler))

server.listen(3000, () => {
  console.log('Building files and then ready at localhost:3000...')
})
