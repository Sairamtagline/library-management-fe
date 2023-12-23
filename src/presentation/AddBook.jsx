import React from 'react'

import addBookContainer from '../container/addBook.container'
import { AddBookTitle, EditBookTitle } from '../description/addBook.description'
import MButton from '../shared/MButton'
import MInput from '../shared/MInput'
import MLoader from '../shared/MLoader'
import MStack from '../shared/MStack'
import MTypography from '../shared/MTypography'
import { AUTHOR_NAME, BOOK_NAME, EDIT, EMPTY_VALUE } from '../utils/constant'
import { equal, ternary, values } from '../utils/javascript'
import { MUIStyled } from '../utils/muiStyled'

const Label = MUIStyled(MTypography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.main,
  textAlign: 'start',
  fontWeight: 700,
}))
const Input = MUIStyled(MInput)(({ theme }) => ({
  '&.MuiFormControl-root': {
    '& .MuiInputBase-input': {
      padding: '8px',
      fontSize: 14,
    },
  },
}))

const AddBook = () => {
  const { book, handleSubmit, handleChange, handleClose, toggledType } =
    addBookContainer()

  return (
    <form onSubmit={handleSubmit}>
      <MStack direction="row" spacing={2}>
        <MStack spacing={1} flex={1}>
          <Label>Book name</Label>
          <Input
            variant="filled"
            placeholder="Enter book name"
            sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
            type="text"
            name={BOOK_NAME}
            value={book.form.bookName}
            onChange={handleChange}
            error={ternary(book.errors?.bookName?.message, true, false)}
            helperText={ternary(
              !book.errors?.bookName?.isValid,
              book.errors?.bookName?.message,
              EMPTY_VALUE,
            )}
          />
        </MStack>
        <MStack spacing={1} flex={1}>
          <Label>Author Name</Label>
          <Input
            variant="filled"
            placeholder="Enter author name"
            sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
            type="text"
            name={AUTHOR_NAME}
            value={book.form.authorName}
            onChange={handleChange}
            error={ternary(book.errors?.authorName?.message, true, false)}
            helperText={ternary(
              !book.errors?.authorName?.isValid,
              book.errors?.authorName?.message,
              EMPTY_VALUE,
            )}
          />
        </MStack>
      </MStack>

      <MStack direction="row" spacing={1} alignItems="center" mt={4}>
        <MButton
          variant="contained"
          color="primary"
          type="submit"
          disabled={
            values(book.errors).some(value => !value.isValid) || book.isLoading
          }
        >
          {ternary(
            book.isLoading,
            <>
              {ternary(equal(toggledType, EDIT), EditBookTitle, AddBookTitle)}
              <MLoader sx={{ ml: 1 }} size={20} color="secondary" />
            </>,
            `${ternary(equal(toggledType, EDIT), EditBookTitle, AddBookTitle)}`,
          )}
        </MButton>
        <MButton variant="outlined" color="warning" onClick={handleClose}>
          Cancel
        </MButton>
      </MStack>
    </form>
  )
}

export default AddBook
