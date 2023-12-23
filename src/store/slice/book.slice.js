import { createSlice } from '@reduxjs/toolkit'

import { EMPTY_VALUE } from '../../utils/constant'

const initialState = {
  toggledType: EMPTY_VALUE,
  bookDetails: {},
  bookList: {},
}

const book = createSlice({
  name: 'book',
  initialState,
  reducers: {
    handleToggledType: (state, action) => {
      state.toggledType = action.payload
    },
    handleEditToggledType: (state, action) => {
      const { type, data } = action.payload
      state.toggledType = type
      state.bookDetails = data
    },
    setBookList: (state, action) => {
      state.bookList = action.payload
    },
  },
})

export const { handleToggledType, handleEditToggledType, setBookList } =
  book.actions
export const getBookState = state => state.book
export default book.reducer
