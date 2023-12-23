import { FormControl, InputLabel, Select } from '@mui/material'

import { MUIStyled } from '../utils/muiStyled'

const StyledSelect = MUIStyled(Select)(({ theme }) => ({
  padding: '12px 18px',
  background: `linear-gradient(180deg,${theme.palette.primary.main}, ${theme.palette.primary.blue})`,
  color: theme.palette.white.main,
  borderRadius: 21,
  '& .MuiSelect-select': {
    padding: 0,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.white.main,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
}))

const MSelect = ({
  title,
  label,
  value,
  handleChange,
  options,
  children,
  ...rest
}) => {
  return (
    <>
      <InputLabel sx={{ color: 'white.main' }} id="custom-select-label">
        {title}
      </InputLabel>
      <FormControl fullWidth {...rest}>
        <StyledSelect
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          onChange={handleChange}
        >
          {children}
        </StyledSelect>
      </FormControl>
    </>
  )
}

export default MSelect
