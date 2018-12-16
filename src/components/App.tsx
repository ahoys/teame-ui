/** @jsx jsx */
import { jsx } from '@emotion/core';
import IconButton from 'components/buttons/IconButton';
import TextInput from 'components/inputs/TextInput';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { connect } from 'react-redux';

jsx;

export const notInSessionLayout = getSession => (
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

export const App = ({ inSession, getSession }) =>
  inSession ? inSessionLayout : notInSessionLayout(getSession);

export interface IProps {
  inSession: boolean;
}

export const mapStateToProps = (state: any): IProps => ({
  inSession: state.getIn(['session', 'token']) !== '',
});

export const mapDispatchToProps = dispatch => ({
  getSession: () =>
    dispatch({
      payload: {
        token: 'JustAnExampleToken',
        username: 'Mr. Example',
      },
      type: 'RECEIVE_SESSION',
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
