/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { FiHeart } from 'react-icons/fi';

jsx;

export default () => (
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
    Hello World! <FiHeart />
  </div>
);
