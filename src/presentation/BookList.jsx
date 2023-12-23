// import { Container, Drawer, Menu } from '@mui/material'

import bookContainer from '../container/books.container'
import { columns } from '../description/books/books.description'
import MButton from '../shared/MButton'
import MLoader from '../shared/MLoader'
import MModal from '../shared/MModal'
import MStack from '../shared/MStack'
import MTypography from '../shared/MTypography'
import RowTable from '../shared/table/index'
import { NO_DATA, REMOVE, USER } from '../utils/constant'
import { checkIncludes, equal, length, ternary } from '../utils/javascript'
import AddBook from './AddBook'
import IssueAndReturnBook from './books/IssueAndReturnBook'
import RemoveBook from './books/RemoveBook'
import RenderCell from './books/RenderCell'

const BookList = () => {
  const {
    toggledType,
    toggleState,
    handleClose,
    title,
    commonModal,
    isLoading,
    list,
    role,
  } = bookContainer()

  return (
    <>
      {ternary(
        !equal(role, USER),
        <MStack justifyContent="flex-end" direction="row">
          <MButton
            type="submit"
            variant="contained"
            sx={{ marginBottom: 2 }}
            onClick={() => toggleState('add')}
          >
            Add book
          </MButton>
        </MStack>,
        null,
      )}

      <MModal open={toggledType} handleClose={handleClose} title={title}>
        {ternary(
          equal(toggledType, REMOVE),
          <RemoveBook />,
          ternary(
            checkIncludes(toggledType, commonModal),
            <IssueAndReturnBook />,
            <AddBook />,
          ),
        )}
      </MModal>

      {ternary(
        length(list),
        <RowTable
          data={list}
          columns={columns.filter(
            ({ title }) => !(title === 'Actions' && role === USER),
          )}
          sx={{
            '& .MuiTableHead-root': {
              '& .MuiTableRow-root .MuiTableCell-root:last-child': {
                textAlign: role === USER ? 'left' : 'right',
              },
            },
          }}
          renderCell={(value, item) => (
            <RenderCell type={value} item={item} role={role} />
          )}
          // columns={columns}
        />,
        <MStack
          justifyContent="center"
          alignItems="center"
          minHeight={{ sm: 250, xs: 100 }}
        >
          {ternary(
            isLoading,
            <MLoader sx={{ ml: 1 }} size={20} color="white" />,
            <MTypography
              fontSize={{ sm: '32px', xs: '18px' }}
              lineHeight={{ sm: '38px', xs: ' 20px' }}
              color="white.main"
              fontWeight="700"
              textAlign="center"
            >
              {NO_DATA}
            </MTypography>,
          )}
        </MStack>,
      )}
    </>
  )
}

export default BookList
