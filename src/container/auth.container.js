import { useEffect } from 'react'

import { useLocation } from '../hooks/useLocation'
import { useNavigate } from '../hooks/useNavigate'
import {
  APP_TOKEN,
  BOOKS_URL,
  DASHBOARD_URL,
  LOGIN_URL,
  PRIVATE_PAGES,
  PUBLIC_PAGES,
  ROLE,
  USER,
} from '../utils/constant'
import { checkIncludes, equal, ternary } from '../utils/javascript'
import { loadStateFn } from '../utils/localStorage'

const authContainer = () => {
  const token = loadStateFn(APP_TOKEN)
  const { currentPath } = useLocation()
  const role = loadStateFn(ROLE)
  const { navigate } = useNavigate()

  useEffect(() => {
    if (token && checkIncludes(currentPath, PUBLIC_PAGES)) {
      navigate(ternary(equal(role, USER), BOOKS_URL, DASHBOARD_URL))
    }
    if (!token && checkIncludes(currentPath, PRIVATE_PAGES)) {
      navigate(LOGIN_URL)
    }
  }, [token, currentPath, navigate])
}

export default authContainer
