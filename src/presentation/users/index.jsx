import React, { memo } from 'react'

import usersContainer from '../../container/users/users.container'
import {
  addUserTitle,
  editUserTitle,
} from '../../description/users/addUser.description'
import { columns } from '../../description/users/users.description'
import MButton from '../../shared/MButton'
import MLoader from '../../shared/MLoader'
import MStack from '../../shared/MStack'
import MTypography from '../../shared/MTypography'
import RowTable from '../../shared/table/index'
import { NO_DATA } from '../../utils/constant'
import { gt, length } from '../../utils/javascript'
import { MUIStyled } from '../../utils/muiStyled'
import AddUser from './AddUser'
import RemoveUser from './RemoveUser'
import RenderCell from './RenderCell'

const TableWrapper = MUIStyled(MStack)(() => ({
  '.MuiTable-root': {
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        '& .MuiTableCell-root': {
          whiteSpace: 'normal',
          '&:first-child': {
            width: '4%',
          },
          '&:nth-child(2)': {
            width: '12%',
          },
          '&:nth-child(3)': {
            width: '20%',
            '& .MuiTypography-root': {
              maxWidth: 280,
            },
          },
          '&:nth-child(4)': {
            width: '20%',
            '& .MuiTypography-root': {
              maxWidth: 280,
            },
          },
          '&:nth-child(5)': {
            width: '11%',
          },
          '&:nth-child(6)': {
            width: '18%',
            '& .MuiTypography-root': {
              maxWidth: 280,
            },
          },
          '&:nth-child(7)': {
            width: '15%',
          },
        },
      },
    },
  },
}))

const UsersPage = () => {
  const {
    users,
    toggleAddUserPopup,
    setEditUserModal,
    setDeleteUserModal,
    onEditClose,
  } = usersContainer()

  return (
    <MStack>
      <MStack justifyContent="flex-end" direction="row">
        <MButton
          variant="contained"
          color="primary"
          onClick={() => toggleAddUserPopup(true)}
        >
          {addUserTitle}
        </MButton>
      </MStack>

      {users.showAddPopup && (
        <AddUser
          onClose={() => toggleAddUserPopup(false)}
          title={addUserTitle}
        />
      )}

      {users.selectedEditUser && (
        <AddUser
          onClose={onEditClose}
          data={users.selectedEditUser}
          title={editUserTitle}
        />
      )}

      {users.selectedDeleteUser && (
        <RemoveUser data={users.selectedDeleteUser} />
      )}

      {gt(length(users.results)) ? (
        <MStack mt={2} sx={{ overflowY: 'auto' }}>
          <TableWrapper sx={{ maxHeight: 800 }}>
            <RowTable
              data={users.results}
              columns={columns}
              renderCell={(value, item) => (
                <RenderCell
                  type={value}
                  item={item}
                  setEditUserModal={setEditUserModal}
                  setDeleteUserModal={setDeleteUserModal}
                />
              )}
            />
          </TableWrapper>
        </MStack>
      ) : !users.isLoading ? (
        <MStack
          justifyContent="center"
          alignItems="center"
          minHeight={{ sm: 250, xs: 100 }}
        >
          <MTypography
            fontSize={{ sm: '32px', xs: '18px' }}
            lineHeight={{ sm: '38px', xs: ' 20px' }}
            color="white.main"
            fontWeight="700"
            textAlign="center"
          >
            {NO_DATA}
          </MTypography>
        </MStack>
      ) : (
        <MStack alignItems="center">
          <MLoader />
        </MStack>
      )}
    </MStack>
  )
}

export default memo(UsersPage)
