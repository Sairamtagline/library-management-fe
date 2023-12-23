import React, { memo } from 'react'

import { removeConfirmationTitle } from '../description/common.description'
import MButton from '../shared/MButton'
import MLoader from '../shared/MLoader'
import MStack from '../shared/MStack'
import { CANCEL, REMOVE } from '../utils/constant'
import { areEqualProps, ternary } from '../utils/javascript'

const ConfirmationPopup = ({ onOk, onCancel, isLoading }) => {
  return (
    <>
      <MStack color="white.main">{removeConfirmationTitle}</MStack>
      <MStack direction="row" spacing={1} alignItems="center" mt={2}>
        <MButton
          variant="contained"
          color="primary"
          onClick={onOk}
          disabled={isLoading}
        >
          {ternary(
            isLoading,
            <>
              {REMOVE}
              <MLoader sx={{ ml: 1 }} size={20} color="secondary" />
            </>,
            REMOVE,
          )}
        </MButton>
        <MButton
          variant="outlined"
          color="warning"
          onClick={onCancel}
          disabled={isLoading}
        >
          {CANCEL}
        </MButton>
      </MStack>
    </>
  )
}

export default memo(ConfirmationPopup, areEqualProps)
