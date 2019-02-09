import T from 'types';
import request from 'superagent';
import { createContext } from 'react';

export const session: T.ISessionContext = {
  username: '',
  token: '',
  isSigningIn: false,
  requestSession: (username, password, callback) => {
    request
      .get('/login')
      .auth(username, password)
      .end((err: any, res: any) => {
        if (
          !err &&
          res &&
          res.status === 200 &&
          typeof res.body === 'object' &&
          typeof res.body.teameToken === 'string'
        ) {
          callback(null, res.body.teameToken);
        } else {
          callback(err, '');
        }
      });
  },
};

export const SessionContext = createContext(session);
