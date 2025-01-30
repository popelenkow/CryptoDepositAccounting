/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {} from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    paperL005: string;
    paperL01: string;
  }
  interface SimplePaletteColorOptions {
    mainL062: string;
    mainD05: string;
  }
  interface PaletteColor {
    mainL062: string;
    mainD05: string;
  }
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
