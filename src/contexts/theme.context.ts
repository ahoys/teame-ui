import { createContext } from 'react';
import T from 'types';

/**
 * The global theme context is defined here.
 * We use a triadic color scheme, please see the README
 * for more.
 */
export const theme: T.IThemeContext = {
  // 60% of the palette.
  primaryColor: '',
  // 30% of the palette.
  secondaryColor: '',
  // 10% of the palette.
  accentColor: '',
  // The main background color.
  bodyColor: '#f7f7f7',
  // The global values affecting everything if not overridden.
  global: {
    // The base font settings.
    'p, h1, h2, h3, svg': {
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 300,
      fontSize: '1rem',
      margin: 0,
      padding: 0,
      color: '#2b2b2b',
    },
    // Paragraphs.
    p: {
      fontSize: '1rem',
      fontWeight: 300,
    },
    // Main headers.
    h1: {
      fontSize: '1.6rem',
      fontWeight: 300,
    },
    // Section headers.
    h2: {
      fontSize: '1.4rem',
      fontWeight: 300,
    },
    // Sub headers.
    h3: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    // Links.
    a: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  },
};

export const ThemeContext = createContext(theme);
