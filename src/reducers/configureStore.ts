import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import session from './reducer.session';

export default initialState => {
  const rootReducer = combineReducers({ session });
  return createStore(rootReducer, initialState);
};
