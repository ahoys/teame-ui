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
