/** @jsx jsx */
import T from 'types';
import { jsx, Global } from '@emotion/core';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import SessionBar from 'containers/SessionBar';
import React, { useContext, useState } from 'react';
import { ThemeContext } from 'contexts/theme.context';
import request from 'superagent';

jsx;

const App = () => {
  const [token, setToken] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const handleSignIn = (username: string, password: string) => {
    setIsSigningIn(true);
    request
      .get('/login')
      .auth(username, password)
      .end((err, res) => {
        setIsSigningIn(false);
        if (!err && res && res.status === 200) {
          setToken(res.body.teameToken);
        }
      });
  };
  const handleSignOut = () => {
    setToken('');
  };
  const themeContext = useContext(ThemeContext);
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: themeContext.bodyColor,
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
      {token === '' ? null : <SessionBar handleSignOut={handleSignOut} />}
      {token === '' ? (
        <Login handleSignIn={handleSignIn} isSigningIn={isSigningIn} />
      ) : (
        <Dashboard token={token} />
      )}
    </div>
  );
};

export default App;
