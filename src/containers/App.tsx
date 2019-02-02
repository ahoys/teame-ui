/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
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
      img: {
        margin: '16px',
      },
    }}
  >
    <h1>Your face after you realize you've been living a lie.</h1>
    <img src="https://media.giphy.com/media/3kzJvEciJa94SMW3hN/giphy.gif" />
    <p>Your token is {token}</p>
  </div>
);

export const App = ({ inSession, token }) => (
  <div
    css={{
      background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
      backgroundSize: '400%',
      '-webkit-animation': 'Gradient 15s ease infinite',
      '-moz-animation': 'Gradient 15s ease infinite',
      animation: 'Gradient 15s ease infinite',
      '@keyframes Gradient': {
        '0%': {
          backgroundPosition: '0% 50%',
        },
        '50%': {
          backgroundPosition: '100% 50%',
        },
        '100%': {
          backgroundPosition: '0% 50%',
        },
      },
    }}
  >
    <Global
      styles={{
        'p, h1, h2, h3': {
          fontFamily: 'Open Sans, sans-serif',
          fontWeight: 300,
          fontSize: '1rem',
          margin: 0,
          padding: 0,
          color: 'white',
        },
        h1: {
          fontSize: '1.6rem',
          fontWeight: 300,
        },
        h2: {
          fontSize: '1.4rem',
          fontWeight: 300,
        },
        h3: {
          fontSize: '1rem',
          fontWeight: 600,
        },
      }}
    />
    {inSession ? inSessionLayout({ token }) : <Login />}
  </div>
);

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
