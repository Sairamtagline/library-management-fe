import { Button as BTN } from '@mui/material'

import { MUIStyled } from '../utils/muiStyled'

const Button = MUIStyled(BTN)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 600,
  padding: '10px 24px',
  lineHeight: 1.5,
  borderRadius: 21,
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px',
    fontSize: 14,
    minHeight: 'auto',
  },
  '&.MuiButton-containedPrimary': {
    background: theme.palette.error.main,
    transition: 'all 0.5s ease-in-out',
    color: theme.palette.white.main,
    '&:hover': {
      background: `linear-gradient(180deg,${theme.palette.primary.main}, ${theme.palette.primary.blue})`,
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      opacity: 0.8,
      cursor: 'not-allowed',
      pointerEvents: 'auto',
    },
  },
  '&.MuiButton-containedWhite:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: theme.palette.white.main,
  },
  '&:active, &:hover, &:focus': {
    boxShadow: 'none',
  },
  '&.MuiButton-text': {
    backgroundColor: 'transparent',
    padding: 0,
    fontWeight: 'normal',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  '&.MuiButton-containedInfo': {
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    '&:hover': {
      backgroundColor: theme.palette.info.light,
      borderColor: theme.palette.primary.main,
      color: theme.palette.info.dark,
      '& .MuiSvgIcon-root': {
        color: theme.palette.white.main,
      },
    },
  },
  '&.MuiButton-outlinedNatural': {
    '&.Mui-disabled': {
      borderColor: theme.palette.natural.main,
      '& *': {
        color: 'rgba(101, 110, 128, 0.50)',
      },
    },
  },
  '&.MuiButton-containedWarning': {
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.error.main,
    },
  },
}))

const MButton = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>
}

export default MButton
