import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

import { tableColumnValues } from '../../description/books/books.description'
import useDispatchAndSelector from '../../hooks/useDispatchAndSelector'
import MButton from '../../shared/MButton'
import MStack from '../../shared/MStack'
import { handleEditToggledType } from '../../store/slice/book.slice'
import { EDIT, ISSUE, REMOVE, RETURN, USER } from '../../utils/constant'
import { getYesOrNo, ternary } from '../../utils/javascript'
import { MUIStyled } from '../../utils/muiStyled'

const ActionButton = MUIStyled(MButton)(({ theme }) => ({
  padding: '6px 12px',
  minHeight: 'unset',
  fontSize: 14,
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
  },
}))

const RenderCell = ({ type, item, role }) => {
  const { cusDispatch } = useDispatchAndSelector()

  const renderCell = () => {
    const handleButtonClick = (type, item) => {
      cusDispatch(handleEditToggledType({ type, data: item }))
    }

    const columnData = {
      [tableColumnValues.name]: item.name,
      [tableColumnValues.author]: item.author,
      [tableColumnValues.availability]: getYesOrNo(item.currentAvailability),
      ...(role !== USER && {
        [tableColumnValues.action]: (
          <MStack direction="row" justifyContent="end" spacing={2}>
            <ActionButton
              variant="outlined"
              onClick={() => handleButtonClick(EDIT, item)}
            >
              <EditIcon />
            </ActionButton>
            <ActionButton
              variant="contained"
              onClick={() => handleButtonClick(REMOVE, item)}
            >
              <DeleteIcon />
            </ActionButton>
            {ternary(
              item.currentAvailability,
              <ActionButton
                variant="outlined"
                onClick={() => handleButtonClick(ISSUE, item)}
              >
                <LibraryBooksIcon />
              </ActionButton>,
              <ActionButton
                variant="contained"
                onClick={() => handleButtonClick(RETURN, item)}
              >
                <KeyboardReturnIcon />
              </ActionButton>,
            )}
          </MStack>
        ),
      }),
    }

    return columnData[type]
  }
  return renderCell(type, item)
}

export default RenderCell
