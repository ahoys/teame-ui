/** @jsx jsx */
import T from 'types';
import { jsx } from '@emotion/core';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import SessionBar from 'containers/SessionBar';
import React, { useContext } from 'react';
import { SessionContext } from 'contexts/session.context';
import { ThemeContext } from 'contexts/theme.context';

jsx;

const App = () => {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: theme.bodyColor,
      }}
    >
      {session.token === '' ? (
        <Login />
      ) : (
        <div>
          <p>{session.token}</p>
          <p>{session.username}</p>
          <br />
          <p>Teame is still heavily work in progress.</p>
          <br />
          <p onClick={session.remove} style={{ cursor: 'pointer' }}>
            Sign out.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
