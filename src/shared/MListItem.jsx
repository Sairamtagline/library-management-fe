import { ListItem } from '@mui/material'

const MListItem = props => {
  return <ListItem {...props}>{props.children}</ListItem>
}

export default MListItem
