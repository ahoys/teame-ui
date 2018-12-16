interface ISession {
  username: string;
  password: string;
  token: string;
}

export const requestSession = (username: ISession, password: ISession) => ({
  payload: {
    password,
    username,
  },
  type: 'REQUEST_SESSION',
});

export const receiveSession = (username: ISession, token: ISession) => ({
  payload: {
    token,
    username,
  },
  type: 'RECEIVE_SESSION',
});
