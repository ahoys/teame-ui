/** @jsx jsx */
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import TextInput from 'components/inputs/TextInput';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import base64 from 'base-64';
import request from 'superagent';

jsx;

const Login = class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'example1',
      password: 'example1',
    };
    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSetUsername(event) {
    this.setState({
      username: event.target.value,
    });
  };

  handleSetPassword(event) {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.getSession(
      this.state.username,
      this.state.password,
    )
  }

  render() {
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
          <IconButton icon={FiLogIn} str="Login" handleClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export const mapStateToProps = (state: any): IProps => ({});

export const mapDispatchToProps = dispatch => ({
  getSession: (username, password) => {
    console.log(username, password);
    request
      .get(`/login?username=${username}&password=${password}`)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
          console.log(res.body);
        }
      })

    // fetch('/login', {
    //   method: 'POST',
    //   body: {
    //     Authorization: 'Basic ' + base64.encode(`${username}:${password}`)
    //   },
    //   mode: 'no-cors',
    // })
    // .then(res => res.json())
    // .then(res => {
    //   dispatch({
    //     payload: {
    //       token: res.teameToken,
    //       username: 'example1',
    //     },
    //     type: 'RECEIVE_SESSION',
    //   });
    // });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
