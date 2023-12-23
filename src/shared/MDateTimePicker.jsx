import { InputLabel } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { MUIStyled } from '../utils/muiStyled'

const StyledDateTimePicker = MUIStyled(DateTimePicker)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    color: theme.palette.white.main,
  },
  '& .MuiInputBase-root': {
    padding: '12px 18px',
    background: `linear-gradient(180deg,${theme.palette.primary.main}, ${theme.palette.primary.blue})`,
    borderRadius: 21,
    '& .MuiInputBase-input': {
      padding: 0,
      color: theme.palette.white.main,
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
    '& .MuiButtonBase-root': {
      color: theme.palette.white.main,
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 0,
      },
    },
  },
}))

const DDTDateTimePicker = ({ label, onChange, value, ...rest }) => {
  return (
    <>
      <InputLabel sx={{ color: 'white.main' }}>{label}</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <StyledDateTimePicker onChange={onChange} value={value} {...rest} />
        </DemoContainer>
      </LocalizationProvider>
    </>
  )
}

export default DDTDateTimePicker
