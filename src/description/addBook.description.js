import { AUTHOR_NAME, BOOK_NAME, EMPTY_VALUE } from '../utils/constant'

export const ADD_BOOK_INITIAL_STATE = {
  form: { bookName: EMPTY_VALUE, authorName: EMPTY_VALUE },
  errors: {},
  isLoading: false,
}

export const AddBookFields = [BOOK_NAME, AUTHOR_NAME]

export const AddBookTitle = 'Add book'
export const EditBookTitle = 'Edit book'
