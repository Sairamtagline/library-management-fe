import { useCallback, useState } from 'react'

import { fields, INITIAL_STATE } from '../description/login.description'
import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import { useHandleToast } from '../hooks/useHandleToast'
import { useNavigate } from '../hooks/useNavigate'
import { setUser } from '../store/slice/dashboard.slice'
import api from '../utils/api'
import { LOGIN_API_URL, POST } from '../utils/apiPath'
import {
  APP_TOKEN,
  BOOKS_URL,
  DASHBOARD_URL,
  EMPTY_VALUE,
  ERROR_MSG,
  ROLE,
  USER,
} from '../utils/constant'
import { equal, ternary } from '../utils/javascript'
import { saveStateFn } from '../utils/localStorage'
import validateValue from '../utils/validation'

const loginContainer = () => {
  const [login, setLogin] = useState(INITIAL_STATE)
  const { navigate } = useNavigate()
  const { errorMsg, successMsg } = useHandleToast()
  const { cusDispatch } = useDispatchAndSelector()

  const handleChange = useCallback(e => {
    const { name, value, type } = e.target
    const { isValid, message } = validateValue(type, value)

    setLogin(login => ({
      ...login,
      form: { ...login.form, [name]: value },
      errors: {
        ...login.errors,
        [name]: ternary(!isValid, message, EMPTY_VALUE),
      },
    }))
  }, [])

  const handleLogin = async () => {
    const payload = {
      email: login.form.email,
      password: login.form.password,
    }
    setLogin(login => ({ ...login, isLoading: true }))
    try {
      const res = await api(POST, LOGIN_API_URL, false, payload)
      if (res?.status) {
        successMsg(res?.message)
        saveStateFn(APP_TOKEN, res?.data?.accessToken)
        saveStateFn(ROLE, res?.data?.role)
        cusDispatch(setUser(res?.data))
        setTimeout(() => {
          navigate(
            ternary(equal(res?.data?.role, USER), BOOKS_URL, DASHBOARD_URL),
          )
        })
      } else {
        errorMsg(res?.err?.message || ERROR_MSG)
      }
    } catch (error) {
      errorMsg(error?.message || ERROR_MSG)
    }
    setLogin(login => ({ ...login, isLoading: false }))
  }

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      let isValidForm = true

      fields.forEach(field => {
        const { isValid, message } = validateValue(field, login.form?.[field])

        if (!isValid) isValidForm = false

        setLogin(login => ({
          ...login,
          form: { ...login.form, [field]: login.form?.[field] },
          errors: {
            ...login.errors,
            [field]: ternary(!isValid, message, EMPTY_VALUE),
          },
        }))
      })

      if (!isValidForm) return
      handleLogin()
    },
    //eslint-disable-next-line
    [JSON.stringify(login.form), navigate],
  )

  return { login, handleChange, handleSubmit }
}

export default loginContainer
