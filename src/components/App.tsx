/** @jsx jsx */
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import TextInput from 'components/inputs/TextInput';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import base64 from 'base-64';
import Login from 'containers/Login';

jsx;

export const inSessionLayout = ({ token }) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      fontSize: '1rem',
      height: '100vh',
      justifyContent: 'center',
      flexDirection: 'column',
      svg: {
        marginLeft: '8px',
      },
      width: '100vw',
    }}
  >
    <p>You just used Redux-stores! That's cool peanuts.</p>
    <p>Your token is {token}</p>
  </div>
);

export const App = ({ inSession, token, getSession, getGraphQL }) =>
  inSession ? inSessionLayout({ token }) : <Login />;

export interface IProps {
  inSession: boolean;
}

export const mapStateToProps = (state: any): IProps => ({
  inSession: state.getIn(['session', 'token']) !== '',
  token: state.getIn(['session', 'token']),
});

export const mapDispatchToProps = dispatch => ({
  getSession: () => {
    const headers = new Headers(
      {
        'Authorization': 'Basic ' + base64.encode('example1:example1')
      }
    );
    fetch('/protected/route/basic', {
      method: 'GET',
      headers,
      mode: 'no-cors',
    })
    .then(res => res.json())
    .then(res => {
      dispatch({
        payload: {
          token: res.teameToken,
          username: 'example1',
        },
        type: 'RECEIVE_SESSION',
      });
    });
  },
  getGraphQL: () => {
    const query = '{ users { password }}';
    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      // ContentType: 'application/json',
      mode: 'no-cors',
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
