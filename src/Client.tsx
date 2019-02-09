import App from 'containers/App';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import { SessionContext, session, login } from 'contexts/session.context';
import { ThemeContext, theme } from 'contexts/theme.context';

/**
 * If in development mode, the performance will degrade.
 * Here we inform the dev about this.
 */
if (process.env.NODE_ENV === 'development') {
  console.log(
    '%cYou are beautiful. You are special. You are a web developer!',
    'color: red; font-family: sans-serif; ' +
      'font-size: 2em; font-weight: bolder; text-shadow: #000 1px 1px;'
  );
  console.log('You are in a development mode. App performance is degraded.');
}

/**
 * The application is wrapped to context providers. The providers
 * give the app a theme and session information. Also global styles
 * are applied here.
 */
const ContextProviders = () => {
  const [username, setUsername] = useState(session.username);
  const [token, setToken] = useState(session.token);
  const [isSigningIn, setIsSigningIn] = useState(session.isSigningIn);
  return (
    <ThemeContext.Provider value={theme}>
      <SessionContext.Provider
        value={{
          username,
          token,
          isSigningIn,
          create: (newUsername: string, password: string) => {
            setIsSigningIn(true);
            setUsername(newUsername);
            login(newUsername, password, (err, newToken) => {
              setIsSigningIn(false);
              if (!err) {
                setToken(newToken);
              }
            });
          },
        }}
      >
        <Global styles={theme.global} />
        <App />
      </SessionContext.Provider>
    </ThemeContext.Provider>
  );
};

ReactDOM.hydrate(<ContextProviders />, document.getElementById('client'));
