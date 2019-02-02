/**
 * All typings can be found from here.
 * import { types-you-want } from 'typings';
 */
export interface ILoginDispatchToProps {
  getSession: (username: string, password: string) => void;
}

export interface ILoginProps extends ILoginDispatchToProps {
  handleSubmit(event: any): string;
}

export interface ILoginState {
  username: string;
  password: string;
}

export interface ILoginState {
  username: string;
  password: string;
}
