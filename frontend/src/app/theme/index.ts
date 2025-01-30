import { createTheme, darken, lighten } from '@mui/material';

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const appTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      ...baseTheme.palette.primary,
      mainL062: lighten(baseTheme.palette.primary.main, 0.62),
      mainD05: darken(baseTheme.palette.primary.main, 0.5),
    },
    background: {
      ...baseTheme.palette.background,
      paperL005: lighten(baseTheme.palette.background.paper, 0.05),
      paperL01: lighten(baseTheme.palette.background.paper, 0.1),
    },
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
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          transition: 'background-color 0.2s',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
        head: (props) => props.theme.typography.subtitle1,
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
  },
});
