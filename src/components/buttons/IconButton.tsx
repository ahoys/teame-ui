/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Icon from 'react-icons';

jsx;

export default ({ icon, str, handleClick }) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      svg: {
        marginRight: '8px',
      },
    }}
    onClick={handleClick}
  >
    {React.createElement(icon)}
    <span>{str}</span>
  </div>
);
