import { useCallback, useEffect } from 'react'

import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import {
  getDashboardState,
  setData,
  setLoading,
} from '../store/slice/dashboard.slice'
import api from '../utils/api'
import { DASHBOARD_API_URL, GET } from '../utils/apiPath'

const dashboardContainer = () => {
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const dashboard = cusSelector(getDashboardState)

  useEffect(() => {
    updateData()
  }, [])

  const updateData = useCallback(async () => {
    cusDispatch(setLoading(true))
    const res = await api(GET, DASHBOARD_API_URL, true)
    if (res?.status) cusDispatch(setData(res.data))

    cusDispatch(setLoading(false))
  }, [])

  return { dashboardCounts: dashboard.data }
}

export default dashboardContainer
