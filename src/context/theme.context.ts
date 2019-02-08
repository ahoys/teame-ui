import { createContext } from 'react';
import T from 'types';

export const theme: T.ITheme = {
  background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
};

export const ThemeContext = createContext(theme);
