/** @jsx jsx */
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import TextInput from 'components/inputs/TextInput';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import base64 from 'base-64';

jsx;

export const notInSessionLayout = (getSession, getGraphQL) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      fontSize: '1rem',
      height: '100vh',
      justifyContent: 'center',
      svg: {
        marginLeft: '8px',
      },
      width: '100vw',
    }}
  >
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <section>
        <h1>Teame</h1>
      </section>
      <section>You have not logged in. Maybe you'd like to?</section>
      <section>
        <TextInput />
        <TextInput />
        <IconButton icon={FiLogIn} str={'Sign in'} handleClick={getSession} />
        <IconButton icon={FiLogIn} str={'GraphQL'} handleClick={getGraphQL} />
      </section>
    </div>
  </div>
);

export const inSessionLayout = (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      fontSize: '1rem',
      height: '100vh',
      justifyContent: 'center',
      svg: {
        marginLeft: '8px',
      },
      width: '100vw',
    }}
  >
    You just used Redux-stores! That's cool peanuts.
  </div>
);

export const App = ({ inSession, getSession, getGraphQL }) =>
  inSession ? inSessionLayout : notInSessionLayout(getSession, getGraphQL);

export interface IProps {
  inSession: boolean;
}

export const mapStateToProps = (state: any): IProps => ({
  inSession: state.getIn(['session', 'token']) !== '',
});

export const mapDispatchToProps = dispatch => ({
  getSession: () => {
    const headers = new Headers(
      {
        'Authorization': 'Basic ' + base64.encode('example1:example1')
      }
    );
    fetch('/protected/route/basic', {
      method: 'GET',
      headers,
      mode: 'no-cors',
    })
    .then(res => res.json())
    .then(res => {
      dispatch({
        payload: {
          token: res.teameToken,
          username: 'example1',
        },
        type: 'RECEIVE_SESSION',
      });
    });
  },
  getGraphQL: () => {
    const query = '{ users { password }}';
    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      // ContentType: 'application/json',
      mode: 'no-cors',
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
