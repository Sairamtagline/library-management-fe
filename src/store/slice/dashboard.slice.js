import { createSlice } from '@reduxjs/toolkit'

import { INITIAL_STATE } from '../../description/dashboard.description'

const initialState = INITIAL_STATE

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setLoading, setData, setUser } = dashboard.actions
export const getDashboardState = state => state.dashboard
export default dashboard.reducer
