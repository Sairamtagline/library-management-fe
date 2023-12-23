import { useCallback } from 'react'

import useDispatchAndSelector from '../../hooks/useDispatchAndSelector'
import { useHandleToast } from '../../hooks/useHandleToast'
import {
  getUsersState,
  removeUser,
  setActionLoading,
  setDeleteUser,
} from '../../store/slice/users.slice'
import api from '../../utils/api'
import { DELETE, USER_API_URL } from '../../utils/apiPath'
import { ERROR_MSG } from '../../utils/constant'
import { userRemoved } from './addUser.description'

const removeUserContainer = user => {
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { successMsg, errorMsg } = useHandleToast()

  const { actionLoading } = cusSelector(getUsersState)

  const onRemove = useCallback(async () => {
    cusDispatch(setActionLoading(true))
    const res = await api(DELETE, `${USER_API_URL}/${user?._id}`, true)
    if (res?.status) {
      cusDispatch(removeUser())
      cusDispatch(setDeleteUser(null))
      successMsg(userRemoved)
    } else errorMsg(res?.err?.message || ERROR_MSG)
    cusDispatch(setActionLoading(false))
  }, [cusDispatch, JSON.stringify(user)])

  const onCancel = useCallback(() => {
    if (!actionLoading) cusDispatch(setDeleteUser(null))
  }, [cusDispatch, actionLoading])

  return { isLoading: actionLoading, onRemove, onCancel }
}

export default removeUserContainer
