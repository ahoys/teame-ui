import App from 'components/App';
import { fromJS } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'reducers/configureStore';

const store = configureStore(fromJS((window as any).REDUX_DATA));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('client')
);
