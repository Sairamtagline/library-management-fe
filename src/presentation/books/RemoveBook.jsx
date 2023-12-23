import React from 'react'

import removeBookContainer from '../../container/removeBook.container'
import MButton from '../../shared/MButton'
import MLoader from '../../shared/MLoader'
import MStack from '../../shared/MStack'
import MTypography from '../../shared/MTypography'
import { REMOVE } from '../../utils/constant'
import { ternary } from '../../utils/javascript'

const RemoveBook = () => {
  const { handleRemove, handleClose, isLoading } = removeBookContainer()

  return (
    <>
      <MTypography color="white.main">
        Are you sure you want to remove?
      </MTypography>
      <MStack direction="row" spacing={1} alignItems="center" mt={2}>
        <MButton variant="contained" color="primary" onClick={handleRemove}>
          {ternary(
            isLoading,
            <>
              {REMOVE}
              <MLoader sx={{ ml: 1 }} size={20} color="white" />
            </>,
            REMOVE,
          )}
        </MButton>
        <MButton variant="outlined" color="warning" onClick={handleClose}>
          Cancel
        </MButton>
      </MStack>
    </>
  )
}

export default RemoveBook
