/** @jsx jsx */
import T from 'types';
import { jsx } from '@emotion/core';
import * as React from 'react';
import request from 'superagent';
import IconButton from 'components/buttons/IconButton';
import { FiPlus } from 'react-icons/fi';

jsx;

class Dashboard extends React.Component<T.IDashboardProps, T.IDashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasFailed: false,
      users: [],
      newUsername: '',
    };
    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleSubmitNewUser = this.handleSubmitNewUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
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
          flex: '1 1 128px',
          overflowY: 'auto',
          background: '#1f2227',
          marginLeft: '48px', // SessionBar
          svg: {
            marginLeft: '8px',
          },
          img: {
            margin: '16px',
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
        <h1>Your face as Teame is still unfinished.</h1>
        <img src="https://media.giphy.com/media/3kzJvEciJa94SMW3hN/giphy.gif" />
        <p>Your token is {this.props.token}</p>
        {this.state.isLoading ? <p>Loading users...</p> : <p>{users}</p>}
        <br />
        <h1>Add new user</h1>
        <br />
        <input
          type="text"
          placeholder="Username"
          value={this.state.newUsername}
          onChange={this.handleNewUsername}
          autoComplete="on"
        />
        <br />
        <IconButton
          icon={FiPlus}
          str="Save"
          handleClick={this.handleSubmitNewUser}
        />
      </div>
    );
  }

  public componentDidMount() {
    this.getUsers();
  }

  private getUsers(): void {
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
            newUsername: '',
          });
        }
      });
  }

  private handleNewUsername(e): void {
    this.setState({
      newUsername: e.target.value,
    });
  }

  private handleSubmitNewUser(): void {
    request
      .post('/graphql')
      .set('Content-Type', 'text/plain')
      .set('token', this.props.token)
      .send(
        `mutation {createUser(username: "${this.state.newUsername}"){username}}`
      )
      .end((err, res) => {
        if (err) {
          this.setState({
            hasFailed: true,
            newUsername: '',
          });
        } else {
          this.getUsers();
        }
      });
  }
}

export default Dashboard;
