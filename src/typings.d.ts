interface ILoginDispatchToProps {
  getSession: (username: string, password: string) => void;
}

interface ILoginProps {
  getSession: (username: string, password: string) => void;
  handleSetUsername(event: any): void;
  handleSetPassword(event: any): void;
  handleSubmit(event: any): void;
  render(): void;
}

interface ILoginState {
  username: string;
  password: string;
}
