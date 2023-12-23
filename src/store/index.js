import { combineReducers, configureStore } from '@reduxjs/toolkit'

import book from './slice/book.slice'
import dashboardSlice from './slice/dashboard.slice'
import transactionsSlice from './slice/transactions.slice'
import usersSlice from './slice/users.slice'

const appReducer = combineReducers({
  book: book,
  users: usersSlice,
  transactions: transactionsSlice,
  dashboard: dashboardSlice,
})

const reducerProxy = (state, action) => {
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: reducerProxy,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
