/**
 * All typings can be found from here.
 * import { types-you-want } from 'typings';
 */
export interface ILoginStateToProps {
  isRequestingSession: boolean;
}

export interface ILoginProps extends ILoginStateToProps {
  handleSubmit(event: any): string;
  dispatch(creator: any): void;
}

export interface ILoginState {
  username: string;
  password: string;
}

export interface ILoginState {
  username: string;
  password: string;
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

export interface ISessionBarStateToProps {
  hasToken: boolean;
}

export interface ISessionBarProps extends ISessionBarStateToProps {
  dispatch(creator: any): void;
}

export interface ITheme {
  background: string;
}

export interface ISession {
  username: string;
  token: string;
}
