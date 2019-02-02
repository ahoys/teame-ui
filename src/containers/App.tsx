/** @jsx jsx */
import { jsx } from '@emotion/core';
import Login from 'containers/Login';
import React from 'react';
import { connect } from 'react-redux';

jsx;

export const inSessionLayout = ({ token }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      svg: {
        marginLeft: '8px',
      },
    }}
  >
    <p>You just used Redux-stores! That's cool peanuts.</p>
    <p>Your token is {token}</p>
    <img src="https://media.giphy.com/media/3kzJvEciJa94SMW3hN/giphy.gif" />
  </div>
);

export const App = ({ inSession, token }) =>
  inSession ? inSessionLayout({ token }) : <Login />;

export interface IApp {
  inSession: boolean;
  token: string;
}

export const mapStateToProps = (state: any): IApp => ({
  inSession: state.getIn(['session', 'token']) !== '',
  token: state.getIn(['session', 'token']),
});

export const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
