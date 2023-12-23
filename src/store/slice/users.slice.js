import { createSlice, current } from '@reduxjs/toolkit'

import { INITIAL_STATE } from '../../description/users/users.description'
import { DEFAULT_PAGE_SIZE, EMPTY_ARRAY } from '../../utils/constant'
import { equal, lt, removeUniqueArray, ternary } from '../../utils/javascript'

const initialState = INITIAL_STATE

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setAddUserPopup: (state, action) => {
      state.showAddPopup = action.payload
    },
    addNewUser: (state, action) => {
      const currentState = current(state)
      state.results = [action.payload, ...(currentState.results || EMPTY_ARRAY)]
    },
    setUsers: (state, action) => {
      const currentState = current(state)
      const updatedResults = removeUniqueArray([
        ...(currentState.results || EMPTY_ARRAY),
        ...(action.payload.data || EMPTY_ARRAY),
      ])

      state.results = updatedResults
      state.next = !lt(action.payload.data, DEFAULT_PAGE_SIZE)
    },
    setEditUser: (state, action) => {
      state.selectedEditUser = action.payload
    },
    setActionLoading: (state, action) => {
      state.actionLoading = action.payload
    },
    setDeleteUser: (state, action) => {
      state.selectedDeleteUser = action.payload
    },
    removeUser: state => {
      const currentState = current(state)
      const updatedResults = currentState.results?.filter(
        user => !equal(user._id, currentState.selectedDeleteUser?._id),
      )
      state.results = updatedResults
    },
    updateUser: (state, action) => {
      const currentState = current(state)
      const updatedResults = currentState.results?.map(user =>
        ternary(
          equal(user._id, action.payload?._id),
          { ...user, ...action.payload },
          user,
        ),
      )
      state.results = updatedResults
    },
  },
})

export const {
  setLoading,
  setUsers,
  addNewUser,
  setAddUserPopup,
  setEditUser,
  setActionLoading,
  setDeleteUser,
  removeUser,
  updateUser,
} = users.actions
export const getUsersState = state => state.users
export default users.reducer
