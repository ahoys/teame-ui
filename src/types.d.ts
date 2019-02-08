/**
 * All typings can be found from here.
 * import { types-you-want } from 'typings';
 */
export interface ILoginState {
  username: string;
  password: string;
  isRequestingSession: boolean;
}

export interface ILoginState {
  username: string;
  password: string;
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
  }
}

export interface ISessionContext {
  username: string;
  token: string;
}
