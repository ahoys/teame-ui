import { createContext } from 'react';
import T from 'types';

export const session: T.ISessionContext = {
  username: '',
  token: '',
  isSigningIn: false,
  requestSession: null,
  removeSession: null,
};

export const SessionContext = createContext(session);
