import { useCallback, useEffect } from 'react'

import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import {
  getTransactionsState,
  setLoading,
  setTransactions,
} from '../store/slice/transactions.slice'
import api from '../utils/api'
import { GET, TRANSACTIONS_API_URL } from '../utils/apiPath'
import { EMPTY_ARRAY } from '../utils/constant'

const transactionContainer = () => {
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const transactions = cusSelector(getTransactionsState)

  useEffect(() => {
    updateTransactions()
  }, [])

  const updateTransactions = useCallback(async () => {
    cusDispatch(setLoading(true))
    const res = await api(GET, TRANSACTIONS_API_URL, true)

    if (res?.status) cusDispatch(setTransactions(res?.data || EMPTY_ARRAY))
    cusDispatch(setLoading(false))
  }, [])

  return { transactions }
}

export default transactionContainer
