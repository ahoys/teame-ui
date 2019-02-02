/** @jsx jsx */
import { jsx } from '@emotion/core';
import Login from 'containers/Login';
import React from 'react';
import { connect } from 'react-redux';

jsx;

export const inSessionLayout = ({ token }) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '1rem',
      height: '100vh',
      justifyContent: 'center',
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
