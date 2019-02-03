import { Map } from 'immutable';

const initialState = Map({
  token: '',
  username: '',
  isRequestingSession: false,
});

const types = {
  REQUESTING_SESSION: ({ state, payload }) =>
    state.set('isRequestingSession', payload.isRequestingSession),
  RECEIVE_SESSION: ({ state, payload }) =>
    state.set('username', payload.username).set('token', payload.token),
  ABANDON_SESSION: ({ state }) => (state = initialState),
};

export default (state = initialState, action) => {
  return types[action.type]
    ? types[action.type]({ state, payload: action.payload })
    : state;
};
