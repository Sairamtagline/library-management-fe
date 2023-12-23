import { Table } from '@mui/material'
import React from 'react'

const MTable = ({ children, ...rest }) => {
  return <Table {...rest}>{children}</Table>
}

export default MTable
