/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {} from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    red: {
      light: string;
      medium: string;
      main: string;
    };
    green: {
      light: string;
      medium: string;
      main: string;
    };
  }

  interface PaletteOptions {
    red?: {
      light?: string;
      medium?: string;
      main?: string;
    };
    green?: {
      light?: string;
      medium?: string;
      main?: string;
    };
  }
}
