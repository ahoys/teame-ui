const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const base64 = require('base-64');
const fetch = require('node-fetch');
const request = require('superagent');
const compiler = webpack([
  require('../webpack/config.dev.client'),
  require('../webpack/config.dev.server'),
])

const server = express()

server.get('/login', (req, res, cb) => {
  const username = req.query.username;
  const password = req.query.password;
  console.log(req.query);
  request
    .get('http://localhost:8080/login')
    .auth(username, password)
    .end((err, res) => {
      if (err) {
        console.log(err);
        cb({});
      } else {
        cb(res);
      }
    });

  // req.headers.Authorization = 'Basic ' + base64.encode('example1:example1');
  // fetch('http://localhost:8080/login', {
  //   method: 'GET',
  //   headers: req.headers,
  //   mode: 'no-cors',
  // })
  // .then((backRes) => {
  //   res.send(backRes);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.send({});
  // });
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
