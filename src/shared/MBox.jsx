import { Box } from '@mui/material'

const MBox = ({ children, ...rest }) => {
  return <Box {...rest}> {children} </Box>
}

export default MBox
