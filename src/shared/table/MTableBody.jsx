import { TableBody } from '@mui/material'
import React from 'react'

const MTableBody = ({ children, ...rest }) => {
  return <TableBody {...rest}>{children}</TableBody>
}

export default MTableBody
