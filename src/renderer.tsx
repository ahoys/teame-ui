import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from 'components/App';
import flushChunks from 'webpack-flush-chunks';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';

interface IContext {
  status?: number,
  url?: string,
}

export default ({ clientStats }) => (req, res, next) => {
  const context: IContext = {};
  const client = ReactDOMServer.renderToString(
    <App />
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
      </head>
      <body>
        <div id="client">${client}</div>
        ${js}
      </body>
    </html>
  `);
};
