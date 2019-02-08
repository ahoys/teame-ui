import App from 'containers/App';
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  console.log(
    '%cYou are beautiful. You are special. You are a web developer!',
    'color: red; font-family: sans-serif; ' +
      'font-size: 2em; font-weight: bolder; text-shadow: #000 1px 1px;'
  );
  console.log('You are in a development mode. App performance is degraded.');
}

ReactDOM.hydrate(<App />, document.getElementById('client'));
