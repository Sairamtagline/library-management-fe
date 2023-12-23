import { useCallback, useEffect } from 'react'

import useDispatchAndSelector from '../../hooks/useDispatchAndSelector'
import {
  getUsersState,
  setAddUserPopup,
  setDeleteUser,
  setEditUser,
  setLoading,
  setUsers,
} from '../../store/slice/users.slice'
import api from '../../utils/api'
import { GET, USER_API_URL } from '../../utils/apiPath'

const usersContainer = () => {
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const users = cusSelector(getUsersState)

  useEffect(() => {
    updateUsers()
  }, [])

  const updateUsers = useCallback(async () => {
    cusDispatch(setLoading(true))
    const res = await api(GET, USER_API_URL, true)

    if (res?.status) cusDispatch(setUsers(res))
    cusDispatch(setLoading(false))
  }, [])

  const toggleAddUserPopup = useCallback(
    visibility => {
      cusDispatch(setAddUserPopup(visibility))
    },
    [cusDispatch],
  )

  const setEditUserModal = useCallback(
    user => {
      cusDispatch(setEditUser(user))
    },
    [cusDispatch],
  )

  const setDeleteUserModal = useCallback(
    user => {
      cusDispatch(setDeleteUser(user))
    },
    [cusDispatch],
  )

  const onEditClose = useCallback(() => {
    if (!users.actionLoading) setEditUserModal(null)
  }, [setEditUserModal, users.actionLoading])

  return {
    users,
    toggleAddUserPopup,
    setEditUserModal,
    setDeleteUserModal,
    onEditClose,
  }
}

export default usersContainer
