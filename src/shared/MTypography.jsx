import { Typography } from '@mui/material'
import React from 'react'

const MTypography = ({ children, ...rest }) => {
  return <Typography {...rest}>{children}</Typography>
}

export default MTypography
