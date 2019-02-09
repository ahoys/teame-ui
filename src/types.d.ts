/**
 * All typings can be found from here.
 * import { types-you-want } from 'typings';
 */
export interface ISessionContext {
  username: string;
  token: string;
  isSigningIn: boolean;
  createSession: (username: string, password: string) => void;
}

export interface ISessionBarProps {
  handleSignOut: () => void;
}

export interface IDashboardProps {
  token: string;
}

export interface IDashboardState {
  isLoading: boolean;
  hasFailed: boolean;
  users: Array<{ username: string }>;
  newUsername: string;
}

export interface IThemeContext {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bodyColor: string;
  global: {
    [key: string]: {
      [key: string]: string | number;
    };
  };
}
