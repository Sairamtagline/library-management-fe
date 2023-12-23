import { TableHead } from '@mui/material'
import React from 'react'

const MTableHead = ({ children, ...rest }) => {
  return <TableHead {...rest}>{children}</TableHead>
}

export default MTableHead
