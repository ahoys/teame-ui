import App from 'components/App';
import { Map } from 'immutable';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import configureStore from 'reducers/configureStore';
import serialize from 'serialize-javascript';
import flushChunks from 'webpack-flush-chunks';

interface IContext {
  status?: number;
  url?: string;
}

const store = configureStore(Map({}));

export default ({ clientStats }) => (req, res, next) => {
  const context: IContext = {};
  const client = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Code splitting.
  clearChunks();
  const { js } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
  });
  // 404: Not found.
  if (context.status === 404) {
    res.status(404).end('Site not found.');
  }
  // 301: Redirect.
  if (context.url) {
    return res.redirect(301, req.url);
  }
  // 200: Success.
  res.end(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Teame UI</title>
        <meta name="description" content="UI for Teame">
        <meta name="author" content="Ari Höysniemi">
        <style type="text/css">html,body{margin:0;padding:0;}</style>
      </head>
      <body>
        <div id="client">${client}</div>
        <script type='text/javascript'>window.REDUX_DATA = ${serialize(
          store.getState()
        )}</script>
        ${js}
      </body>
    </html>
  `);
};
