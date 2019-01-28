const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const request = require('superagent');
const compiler = webpack([
  require('../webpack/config.dev.client'),
  require('../webpack/config.dev.server'),
])

const server = express()

server.get('/login', (clientReq, clientRes) => {
  request
    .get('http://localhost:8080/login')
    .set('Authorization', clientReq.headers.authorization)
    .end((err, res) => {
      if (
        !err &&
        res &&
        res.body &&
        typeof res.body.teameToken === 'string'
      ) {
        clientRes
          .status(200)
          .send({ token: res.body.teameToken });
      } else {
        clientRes
          .status(401)
          .send(); 
      }
    });
})

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
