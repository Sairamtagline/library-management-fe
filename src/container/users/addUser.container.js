import { useCallback, useEffect, useState } from 'react'

import {
  fields,
  INITIAL_STATE,
  userAdded,
  userUpdated,
} from '../../description/users/addUser.description'
import useDispatchAndSelector from '../../hooks/useDispatchAndSelector'
import { useHandleToast } from '../../hooks/useHandleToast'
import {
  addNewUser,
  getUsersState,
  setActionLoading,
  setAddUserPopup,
  setEditUser,
  updateUser,
} from '../../store/slice/users.slice'
import api from '../../utils/api'
import { POST, PUT, USER_API_URL } from '../../utils/apiPath'
import { EMPTY_VALUE, ERROR_MSG } from '../../utils/constant'
import { ternary } from '../../utils/javascript'
import validateValue from '../../utils/validation'

const addUserContainer = data => {
  const [addUser, setAddUser] = useState(INITIAL_STATE)
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { successMsg, errorMsg } = useHandleToast()

  const { actionLoading } = cusSelector(getUsersState)

  useEffect(() => {
    if (data) setAddUser(addUser => ({ ...addUser, form: data }))
  }, [JSON.stringify(data)])

  const onInputChange = useCallback((e, pattern) => {
    const { name, value } = e.target
    const { isValid, message } = validateValue(pattern, value)

    setAddUser(addUser => ({
      ...addUser,
      form: { ...addUser.form, [name]: value },
      errors: {
        ...addUser.errors,
        [name]: ternary(!isValid, message, EMPTY_VALUE),
      },
    }))
  }, [])

  const formValidity = useCallback(() => {
    let isValidForm = true

    fields.forEach(field => {
      if (!data || (!field.hideOnEdit && data)) {
        const { isValid, message } = validateValue(
          field.pattern,
          addUser.form?.[field.name],
        )

        if (!isValid) isValidForm = false

        setAddUser(addUser => ({
          ...addUser,
          form: { ...addUser.form, [field.name]: addUser.form?.[field.name] },
          errors: {
            ...addUser.errors,
            [field.name]: ternary(!isValid, message, EMPTY_VALUE),
          },
        }))
      }
    })

    return isValidForm
  }, [JSON.stringify(addUser.form)])

  const onAdd = useCallback(
    async e => {
      e.stopPropagation()
      e.preventDefault()

      const isValidForm = formValidity()
      if (!isValidForm) return

      cusDispatch(setActionLoading(true))
      const res = await api(POST, USER_API_URL, true, addUser.form)
      if (res?.status) {
        cusDispatch(addNewUser(res.data))
        cusDispatch(setAddUserPopup(false))
        successMsg(userAdded)
      } else errorMsg(res?.err?.message || ERROR_MSG)
      cusDispatch(setActionLoading(false))
    },
    [formValidity, cusDispatch],
  )

  const onEdit = useCallback(
    async e => {
      e.stopPropagation()
      e.preventDefault()

      const isValidForm = formValidity()
      if (!isValidForm) return

      cusDispatch(setActionLoading(true))
      const res = await api(PUT, `${USER_API_URL}/${addUser.form._id}`, true, {
        updateUser: addUser.form,
      })
      if (res?.status) {
        cusDispatch(updateUser(res.data))
        cusDispatch(setEditUser(null))
        successMsg(userUpdated)
      } else errorMsg(res?.err?.message || ERROR_MSG)
      cusDispatch(setActionLoading(false))
    },
    [formValidity, cusDispatch],
  )

  return { addUser, actionLoading, onInputChange, onAdd, onEdit }
}

export default addUserContainer
