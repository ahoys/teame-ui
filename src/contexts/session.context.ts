import { createContext } from 'react';
import T from 'types';
import { requestSession } from '../services/session.service';

export const session: T.ISessionContext = {
  username: '',
  token: '',
  requestSession,
};

export const SessionContext = createContext({
  username: '',
  token: '',
  requestSession,
});
