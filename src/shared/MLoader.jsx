import { CircularProgress } from '@mui/material'
import React, { memo } from 'react'

import { areEqualProps } from '../utils/javascript'

const MLoader = ({ ...rest }) => {
  return <CircularProgress {...rest} />
}

export default memo(MLoader, areEqualProps)
