/** @jsx jsx */
import T from 'types';
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import React, { useContext, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { SessionContext } from 'contexts/session.context';

jsx;

const Login = () => {
  const [username, setUsername] = useState('example1');
  const [password, setPassword] = useState('Not set');
  const session = useContext(SessionContext);
  const handleUsername = evt => {
    setUsername(evt.target.value);
  };
  const handlePassword = evt => {
    setPassword(evt.target.value);
  };
  const handleSubmit = () => {
    session.create(username, password);
  };
  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        svg: {
          marginLeft: '8px',
        },
        input: {
          margin: '8px',
        },
        width: '100vw',
        h1: {
          fontSize: '2rem',
        },
        '.header': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '1rem',
          marginBottom: '8vh',
        },
        '.info': {
          margin: '1rem',
        },
        animation: 'Opacity 1s ease',
        '@keyframes Opacity': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      }}
    >
      <div className="header">
        <h1>Welcome to Teame</h1>
        <p>The Greatest team management service ever.</p>
      </div>
      <form
        css={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          autoComplete="on"
        />
        <IconButton icon={FiLogIn} str="Login" handleClick={handleSubmit} />
      </form>
      {session.isCreating ? (
        <p className="info">Loading...</p>
      ) : (
        <p className="info">Please log in.</p>
      )}
    </div>
  );
};

export default Login;
