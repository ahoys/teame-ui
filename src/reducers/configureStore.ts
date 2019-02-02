import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import session from './reducer.session';

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

export default initialState => {
  const rootReducer = combineReducers({ session });
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
};
