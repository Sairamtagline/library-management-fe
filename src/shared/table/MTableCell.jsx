import { TableCell } from '@mui/material'
import React from 'react'

const MTableCell = ({ children, ...rest }) => {
  return <TableCell {...rest}>{children}</TableCell>
}
export default MTableCell
