/** @jsx jsx */
import 'typings';
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { connect } from 'react-redux';
import request from 'superagent';

jsx;

class Login extends React.Component<ILoginProps, ILoginState> {
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

  public render() {
    return (
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          fontSize: '1rem',
          height: '100vh',
          justifyContent: 'center',
          svg: {
            marginLeft: '8px',
          },
          input: {
            margin: '8px',
          },
          width: '100vw',
        }}
      >
        <form>
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
      </div>
    );
  }

  private handleSetUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  private handleSetPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  private handleSubmit(event) {
    event.preventDefault();
    this.props.getSession(this.state.username, this.state.password);
  }
}

export const mapStateToProps = (state: any): any => ({});

export const mapDispatchToProps = (dispatch): ILoginDispatchToProps => ({
  getSession: (username, password) => {
    request
      .get('/login')
      .auth(username, password)
      .end((err, res) => {
        if (
          !err &&
          res.status === 200 &&
          res.body &&
          typeof res.body.teameToken === 'string'
        ) {
          dispatch({
            payload: {
              token: res.body.teameToken,
              username,
            },
            type: 'RECEIVE_SESSION',
          });
        }
      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
