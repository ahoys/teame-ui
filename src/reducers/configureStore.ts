import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import session from './reducer.session';

export default initialState => {
  const rootReducer = combineReducers({ session });
  return createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV === 'development'
      ? applyMiddleware(
          thunkMiddleware,
          createLogger({
            // This is needed to parse Immutable stores.
            collapsed: true,
            stateTransformer: state => state.toJS(),
          })
        )
      : applyMiddleware(thunkMiddleware)
  );
};
