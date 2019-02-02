import request from 'superagent';

export const requestSession = (username: string, password: string) => {
  return dispatch => {
    dispatch(requestingSession(true));
    return request
      .get('/login')
      .auth(username, password)
      .end((err, res) => {
        if (!err && res && res.status === 200) {
          dispatch(receiveSession(username, res.body.teameToken));
        }
      });
  };
};

export const requestingSession = (isRequestingSession: boolean) => ({
  payload: {
    isRequestingSession,
  },
  type: 'REQUESTING_SESSION',
});

export const receiveSession = (username: string, token: string) => ({
  payload: {
    username,
    token,
    isRequestingSession: false,
  },
  type: 'RECEIVE_SESSION',
});
