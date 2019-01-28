import { Map } from 'immutable';

const initialState = Map({
  token: '',
  username: '',
});

const types = {
  RECEIVE_SESSION: ({ state, payload }) =>
    state.set('username', payload.username).set('token', payload.token),
};

export default (state = initialState, action) => {
  return types[action.type]
    ? types[action.type]({ state, payload: action.payload })
    : state;
};