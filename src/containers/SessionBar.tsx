/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { SessionContext } from 'contexts/session.context';

jsx;

class SessionBar extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  public render(): React.ReactNode {
    return this.context.token !== '' ? (
      <div
        css={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '48px',
          padding: '48px 0',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            svg: {
              width: '16px',
              height: '16px',
              color: 'black',
            },
          }}
          onClick={this.handleSignOut}
        >
          {React.createElement(FiLogOut)}
        </div>
      </div>
    ) : null;
  }

  private handleSignOut(): void {
    this.context.removeSession();
  }
}

SessionBar.contextType = SessionContext;

export default SessionBar;
