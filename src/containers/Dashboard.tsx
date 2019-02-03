/** @jsx jsx */
import T from 'types';
import { jsx } from '@emotion/core';
import * as React from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import { requestSession } from 'actions/action.session';

jsx;

class Dashboard extends React.Component<T.IDashboardProps, T.IDashboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      hasFailed: false,
      users: [],
    };
  }

  public render(): React.ReactNode {
    const users = this.state.hasFailed
      ? 'Fetch failed!'
      : `Users:${this.state.users.map(u => ` ${u.username}`).toString()}`;
    return (
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
        <p>Your token is {this.props.token}</p>
        {this.state.isLoading ? <p>Loading users...</p> : <p>{users}</p>}
      </div>
    );
  }

  public componentDidMount() {
    request
      .post('/graphql')
      .set('Content-Type', 'text/plain')
      .set('token', this.props.token)
      .send(`{users(username: ""){username}}`)
      .end((err, res) => {
        if (err) {
          this.setState({
            hasFailed: true,
          });
        } else {
          this.setState({
            users: res.body.data.users,
            isLoading: false,
          });
        }
      });
  }
}

export const mapStateToProps = (state: any): T.IDashboardProps => ({
  token: state.getIn(['session', 'token']),
});

export default connect(mapStateToProps)(Dashboard);
