/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

jsx;

export default ({ icon, str, handleClick }) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      svg: {
        marginRight: '8px',
      },
    }}
    onClick={handleClick}
  >
    {React.createElement(icon)}
    <p>{str}</p>
  </div>
);
