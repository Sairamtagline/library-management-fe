import { useEffect } from 'react'

import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import { getDashboardState, setUser } from '../store/slice/dashboard.slice'
import { APP_TOKEN, ROLE } from '../utils/constant'
import { loadStateFn } from '../utils/localStorage'

const appContainer = () => {
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { user } = cusSelector(getDashboardState)

  useEffect(() => {
    cusDispatch(
      setUser({ role: loadStateFn(ROLE), token: loadStateFn(APP_TOKEN) }),
    )
  }, [])

  return { role: loadStateFn(ROLE) || user?.role }
}

export default appContainer
