/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import SessionBar from 'containers/SessionBar';
import React from 'react';
import { ThemeContext } from 'context/theme.context';
import { SessionContext } from 'context/session.context';

jsx;

const App = () => (
  <ThemeContext.Consumer>
    {theme => (
      <SessionContext.Consumer>
        {session => (
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              background: theme.background,
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
                'p, h1, h2, h3, svg': {
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
            <SessionBar />
            {session.token !== '' ? <Dashboard /> : <Login />}
          </div>
        )}
      </SessionContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

export default App;
