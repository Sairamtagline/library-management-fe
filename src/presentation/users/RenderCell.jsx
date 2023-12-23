import { memo } from 'react'

import { DeleteIcon, ModeEditIcon } from '../../assets/Icons'
import { tableColumnValues } from '../../description/users/users.description'
import MButton from '../../shared/MButton'
import { areEqualProps } from '../../utils/javascript'
import { MUIStyled } from '../../utils/muiStyled'

const ActionButton = MUIStyled(MButton)(({ theme }) => ({
  padding: '6px 12px',
  minHeight: 'unset',
  fontSize: 14,
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
  },
}))

const RenderCell = ({ type, item, setEditUserModal, setDeleteUserModal }) => {
  const renderCell = () => {
    const columnData = {
      [tableColumnValues.name]: item.name,
      [tableColumnValues.userName]: item.userName,
      [tableColumnValues.email]: item.email,
      [tableColumnValues.contact]: item.contact,
      [tableColumnValues.edit]: (
        <ActionButton variant="outlined" onClick={() => setEditUserModal(item)}>
          <ModeEditIcon />
        </ActionButton>
      ),
      [tableColumnValues.delete]: (
        <ActionButton
          variant="contained"
          onClick={() => setDeleteUserModal(item)}
        >
          <DeleteIcon />
        </ActionButton>
      ),
    }

    return columnData[type]
  }
  return renderCell(type, item)
}

export default memo(RenderCell, areEqualProps)
