import T from 'types';
import request from 'superagent';
import { createContext } from 'react';

/**
 * Makes a request to fetch a new token.
 * @param username - Client username.
 * @param password - Client password.
 * @param callback - Callback returning the token.
 */
export const login = (
  username: string,
  password: string,
  callback: any
): void => {
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
};

export const session: T.ISessionContext = {
  username: '',
  token: '',
  isCreating: false,
  create: null,
  remove: null,
};

export const SessionContext = createContext(session);
