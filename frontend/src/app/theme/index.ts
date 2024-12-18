import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    red: {
      light: '#ffc2c2',
      medium: '#ff8888',
      main: '#ff2929',
    },
    green: {
      light: '#c2ffc2',
      medium: '#88ff88',
      main: '#29ff29',
    },
  },
  typography: {
    fontFamily: "'Roboto Mono',  Consolas, monospace, 'Courier New'",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Roboto Mono', Consolas, monospace, 'Courier New'",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            color: 'inherit',
          },
          width: 'fit-content',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: 'contain',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            color: 'inherit',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          width: 'fit-content',
        },
      },
    },
  },
});