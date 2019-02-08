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
  bodyColor: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
  // The global values affecting everything if not overridden.
  global: {
    // The base font settings.
    'p, h1, h2, h3, svg': {
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 300,
      fontSize: '1rem',
      margin: 0,
      padding: 0,
      color: 'white',
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
