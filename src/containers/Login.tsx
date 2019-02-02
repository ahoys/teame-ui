/** @jsx jsx */
import T from 'types';
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import * as React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { connect } from 'react-redux';
import { requestSession } from 'actions/action.session';

jsx;

class Login extends React.Component<T.ILoginProps, T.ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: 'example1',
      password: 'Not set',
    };
    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          svg: {
            marginLeft: '8px',
          },
          input: {
            margin: '8px',
          },
          width: '100vw',
          h1: {
            fontSize: '2rem',
          },
          '.header': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '1rem',
            marginBottom: '8vh',
          },
          '.info': {
            margin: '1rem',
          },
        }}
      >
        <div className="header">
          <h1>Welcome to Teame</h1>
          <p>The Greatest team management service ever.</p>
        </div>
        <form
          css={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleSetUsername}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleSetPassword}
          />
          <IconButton
            icon={FiLogIn}
            str="Login"
            handleClick={this.handleSubmit}
          />
        </form>
        {this.props.isRequestingSession ? (
          <p className="info">Loading...</p>
        ) : (
          <p className="info">Please log in.</p>
        )}
      </div>
    );
  }

  private handleSetUsername(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      username: event.target.value,
    });
  }

  private handleSetPassword(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      password: event.target.value,
    });
  }

  private handleSubmit(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();
    this.props.dispatch(
      requestSession(this.state.username, this.state.password)
    );
  }
}

export const mapStateToProps = (state: any): T.ILoginStateToProps => ({
  isRequestingSession: state.getIn(['session', 'isRequestingSession']),
});

export default connect(mapStateToProps)(Login);
