import { createSlice } from '@reduxjs/toolkit'

import { INITIAL_STATE } from '../../description/transactions.description'

const initialState = INITIAL_STATE

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setTransactions: (state, action) => {
      state.results = action.payload
    },
  },
})

export const { setLoading, setTransactions } = transactions.actions
export const getTransactionsState = state => state.transactions
export default transactions.reducer
