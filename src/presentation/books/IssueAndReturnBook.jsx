import { MenuItem } from '@mui/material'

import issueAndReturnContainer from '../../container/issueAndReturn.container'
import MButton from '../../shared/MButton'
import DDTDateTimePicker from '../../shared/MDateTimePicker'
import MLoader from '../../shared/MLoader'
import MSelect from '../../shared/MSelect'
import MStack from '../../shared/MStack'
import MTypography from '../../shared/MTypography'
import { RETURN } from '../../utils/constant'
import { equal, ternary } from '../../utils/javascript'

const IssueAndReturnBook = () => {
  const {
    toggledType,
    bookData,
    handleClose,
    handleChange,
    userList,
    isLoading,
    handleSubmit,
  } = issueAndReturnContainer()

  return (
    <>
      <form onSubmit={handleSubmit}>
        {ternary(
          equal(toggledType, RETURN),
          <MTypography color="white.main">
            Are you sure you want to return?
          </MTypography>,
          <>
            <MStack>
              <DDTDateTimePicker
                label="Please select due date"
                onChange={handleChange}
                value={bookData.dueDate}
                disablePast
              />
            </MStack>
            <MStack mt={2}>
              <MSelect
                title="Select user"
                value={bookData?.selectedUser}
                handleChange={handleChange}
                options={userList}
                sx={{ marginTop: 2 }}
              >
                {userList.map(option => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </MSelect>
            </MStack>
          </>,
        )}

        <MStack direction="row" spacing={1} alignItems="center" mt={3}>
          <MButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            disabled={ternary(
              !equal(toggledType, RETURN),
              !bookData?.dueDate || !bookData?.selectedUser,
              false,
            )}
          >
            {ternary(
              isLoading,
              <>
                {ternary(equal(toggledType, RETURN), 'Return', 'Issue')}
                <MLoader sx={{ ml: 1 }} size={20} color="white" />
              </>,
              ternary(equal(toggledType, RETURN), 'Return', 'Issue'),
            )}
          </MButton>
          <MButton
            variant="outlined"
            color="warning"
            onClick={handleClose}
            sx={{ marginTop: 3 }}
          >
            Cancel
          </MButton>
        </MStack>
      </form>
    </>
  )
}

export default IssueAndReturnBook
