/** @jsx jsx */
import T from 'types';
import { jsx, Global } from '@emotion/core';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';
import SessionBar from 'containers/SessionBar';
import React from 'react';
import { ThemeContext } from 'contexts/theme.context';
import { SessionContext } from 'contexts/session.context';
import { requestSession } from 'services/session.service';

jsx;

class App extends React.Component<{}, T.ISessionContext> {
  constructor(props: {}) {
    super(props);
    this.getToken = this.getToken.bind(this);
    this.removeSession = this.removeSession.bind(this);
    this.state = {
      username: '',
      token: '',
      isSigningIn: false,
      requestSession: this.getToken,
      removeSession: this.removeSession,
    };
  }

  public render(): React.ReactNode {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <SessionContext.Provider value={this.state}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                background: theme.bodyColor,
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
              {this.state.token !== '' ? <Dashboard /> : <Login />}
            </div>
          </SessionContext.Provider>
        )}
      </ThemeContext.Consumer>
    );
  }

  private getToken(username: string, password: string) {
    this.setState({
      isSigningIn: true,
    });
    requestSession(username, password, (err, token) => {
      if (err) {
        this.setState({
          username: '',
          token: '',
          isSigningIn: false,
        });
      } else {
        this.setState({
          username,
          token,
          isSigningIn: false,
        });
      }
    });
  }

  private removeSession() {
    this.setState({
      username: '',
      token: '',
      isSigningIn: false,
    });
  }
}

export default App;
