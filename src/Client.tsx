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
  const [isCreating, setIsCreating] = useState(session.isCreating);
  /**
   * Create will initialize a new session. Meaning that based on the
   * given credentials, a new token is requested from the back-end.
   * @param submittedUsername - Username the client gave to us.
   * @param submittedPassword - Password the client gave to us.
   */
  const create = (
    submittedUsername: string,
    submittedPassword: string
  ): void => {
    setIsCreating(true);
    setUsername(submittedUsername);
    login(submittedUsername, submittedPassword, (err, newToken) => {
      setIsCreating(false);
      if (!err) {
        setToken(newToken);
      }
    });
  };
  const remove = (): void => {
    setUsername('');
    setToken('');
  };
  return (
    <ThemeContext.Provider value={theme}>
      <SessionContext.Provider
        value={{
          username,
          token,
          isCreating,
          create,
          remove,
        }}
      >
        <Global styles={theme.global} />
        <App />
      </SessionContext.Provider>
    </ThemeContext.Provider>
  );
};

ReactDOM.hydrate(<ContextProviders />, document.getElementById('client'));
