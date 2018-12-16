/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Icon from 'react-icons';

jsx;

export default ({ icon, str }) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      svg: {
        marginRight: '8px',
      },
    }}
  >
    {React.createElement(icon)}
    <span>{str}</span>
  </div>
);
