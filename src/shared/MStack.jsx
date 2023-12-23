import { Stack } from '@mui/material'

const MStack = ({ children, ...rest }) => {
  return <Stack {...rest}>{children}</Stack>
}

export default MStack
