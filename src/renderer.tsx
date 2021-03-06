import App from 'containers/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

interface IContext {
  status?: number;
  url?: string;
}

export default ({ clientStats }) => (req, res, next) => {
  const context: IContext = {};
  const client = ReactDOMServer.renderToString(<App />);
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300" type="text/css" />
      </head>
      <body>
        <div id="client">${client}</div>
        ${js}
      </body>
    </html>
  `);
};
