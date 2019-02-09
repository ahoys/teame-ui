import T from 'types';
import request from 'superagent';
import { createContext } from 'react';
import logscribe from 'logscribe';
const { logprint } = logscribe('session.context');

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
          logprint(err);
          callback(err, '');
        }
      });
  },
};

export const SessionContext = createContext(session);
