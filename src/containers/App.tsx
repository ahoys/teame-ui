/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import React from 'react';
import { connect } from 'react-redux';

jsx;

export const App = ({ inSession }) => (
  <div
    css={{
      background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
      backgroundSize: '400%',
      WebkitAnimation: 'Gradient 15s ease infinite',
      MozAnimation: 'Gradient 15s ease infinite',
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
    {inSession ? <Dashboard /> : <Login />}
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
