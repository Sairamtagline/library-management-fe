import { FormGroup, TextField as TF } from '@mui/material'

import { MUIStyled } from '../utils/muiStyled'

const TextField = MUIStyled(TF)(({ theme }) => ({
  marginTop: 0,
  marginBottom: 0,
  '& .MuiInputBase-root': {
    '&:before, &:after': {
      content: 'normal',
    },
    '& .MuiInputBase-input': {
      padding: '12px 18px',
      background: `linear-gradient(180deg,${theme.palette.primary.main}, ${theme.palette.primary.blue})`,
      color: theme.palette.white.main,
      borderRadius: 21,
      [theme.breakpoints.down('sm')]: {
        padding: '10px 14px',
      },
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button, &[type="number"]':
        {
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
        },
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus':
        {
          WebkitBoxShadow: `0 0 0px 40rem #edf4fc inset`,
          borderRadius: 4,
        },
      '&::-webkit-input-placeholder': {
        color: theme.palette.white.main,
        opacity: 1,
      },
      '&:-ms-input-placeholder': {
        color: theme.palette.white.main,
        opacity: 1,
      },
      '&::placeholder': {
        color: theme.palette.white.main,
        opacity: 1,
      },
    },
  },
  '& .MuiFormHelperText-root': {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.error.light,
    '& svg': {
      width: 15,
      height: 15,
      verticalAlign: 'middle',
    },
  },
}))

const MInput = ({ ...rest }) => {
  return (
    <FormGroup>
      <TextField {...rest} />
    </FormGroup>
  )
}

export default MInput
