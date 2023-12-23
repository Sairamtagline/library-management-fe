import { TableRow } from '@mui/material'
import React from 'react'

const MTableRow = ({ children, ...rest }) => {
  return <TableRow {...rest}>{children}</TableRow>
}

export default MTableRow
