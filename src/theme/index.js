import { createTheme } from '@mui/material/styles'
const color = {
  heading: '#0f2448',
  bgColor: '#0C0F27',
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#C89696',
      blue: '#1F2454',
      darkBlue: '#0C0F27',
    },
    secondary: {
      main: '#fd89ff',
      lightGray: '#f2f2f2',
      gray: '#858585',
      darkBlue: '#1F2454',
    },
    natural: {
      main: '#B0D9B1',
      gray: '#79849926',
    },
    info: {
      main: '#D0E7D2',
      light: '#e1f5e3',
      dark: '#2c652c',
    },
    white: {
      main: '#FFFFFF',
      light: '#ffffff4f',
    },
    warning: {
      main: '#ffafaf',
      light: '#ffd0d0',
    },
    error: {
      main: '#df0000',
      light: '#ff7373',
    },
    black: {
      main: '#000000',
      dark: '#166D3B',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: color.bgColor,
          '& a': {
            textDecoration: 'none',
          },
        },
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        color: color.heading,
      },
      h2: {
        color: color.heading,
      },
      h3: {
        color: color.heading,
      },
      h4: {
        color: color.heading,
      },
      h5: {
        color: color.heading,
      },
      h6: {
        color: color.heading,
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          '@media (min-width: 1200px)': {
            maxWidth: 1400,
          },
          '@media (min-width: 1500px)': {
            maxWidth: '1400px',
          },
        },
      },
    },
  },
})

export default theme
