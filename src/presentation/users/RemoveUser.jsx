import React, { memo } from 'react'

import { confirmationTitle } from '../../description/common.description'
import removeUserContainer from '../../description/users/removeUser.container'
import MModal from '../../shared/MModal'
import { areEqualProps } from '../../utils/javascript'
import ConfirmationPopup from '../ConfirmationPopup'

const RemoveUser = ({ data }) => {
  const { isLoading, onRemove, onCancel } = removeUserContainer(data)
  return (
    <MModal open={true} handleClose={onCancel} title={confirmationTitle}>
      <ConfirmationPopup
        onCancel={onCancel}
        onOk={onRemove}
        isLoading={isLoading}
      />
    </MModal>
  )
}

export default memo(RemoveUser, areEqualProps)
