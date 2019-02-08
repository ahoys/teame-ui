import { createContext } from 'react';
import T from 'types';

export const session: T.ISession = {
  username: '',
  token: '',
};

export const SessionContext = createContext(session);
