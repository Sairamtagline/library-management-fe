import { useCallback, useEffect, useState } from 'react'

import {
  ADD_BOOK_INITIAL_STATE,
  AddBookFields,
} from '../description/addBook.description'
import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import { useHandleToast } from '../hooks/useHandleToast'
import {
  getBookState,
  handleEditToggledType,
  handleToggledType,
  setBookList,
} from '../store/slice/book.slice'
import api from '../utils/api'
import { BOOK_API_URL, POST, PUT } from '../utils/apiPath'
import { EDIT, EMPTY_VALUE, ERROR_MSG } from '../utils/constant'
import { equal, keys, length } from '../utils/javascript'
import validateValue from '../utils/validation'

const addBookContainer = () => {
  const [book, setBook] = useState(ADD_BOOK_INITIAL_STATE)
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { toggledType, bookDetails, bookList } = cusSelector(getBookState)
  const { errorMsg, successMsg } = useHandleToast()

  const handleChange = e => {
    const { name, value } = e.target
    const { isValid, message } = validateValue(name, value)

    setBook(book => ({
      ...book,
      form: { ...book.form, [name]: value },
      errors: { ...book.errors, [name]: { isValid, message } },
    }))
  }

  const handleClose = () => {
    if (equal(toggledType, EDIT))
      cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
    else cusDispatch(handleToggledType(EMPTY_VALUE))
  }

  const addBook = async () => {
    const payload = {
      name: book.form.bookName,
      author: book.form.authorName,
    }
    setBook(login => ({ ...login, isLoading: true }))
    try {
      const res = await api(POST, BOOK_API_URL, true, payload)
      if (res?.status) {
        successMsg(res?.message)
        const clone = { ...bookList }
        const cloneData = [...clone.data]
        cloneData.unshift(res?.data)
        clone.data = cloneData
        cusDispatch(setBookList(clone))
        cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
      } else errorMsg(res?.err?.error || ERROR_MSG)
    } catch (error) {
      errorMsg(error?.message || ERROR_MSG)
    }
    setBook(login => ({ ...login, isLoading: false }))
  }

  const updateBook = async () => {
    const payload = {
      name: book.form.bookName,
      author: book.form.authorName,
    }
    setBook(login => ({ ...login, isLoading: true }))
    try {
      const res = await api(
        PUT,
        `${BOOK_API_URL}/${bookDetails?._id}`,
        true,
        payload,
      )
      if (res?.status) {
        const clone = { ...bookList }
        const cloneData = [...clone.data]
        const currentInd = cloneData.findIndex(item =>
          equal(item?._id, bookDetails?._id),
        )
        if (!equal(currentInd, -1)) {
          cloneData[currentInd] = res?.data
          clone.data = cloneData
          cusDispatch(setBookList(clone))
        }
        successMsg(res?.message)
        cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
      } else errorMsg(res?.err?.message || ERROR_MSG)
    } catch (error) {
      errorMsg(error?.message || ERROR_MSG)
    }
    setBook(login => ({ ...login, isLoading: false }))
  }

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      let isValidForm = true
      AddBookFields.forEach(field => {
        const { isValid, message } = validateValue(field, book.form?.[field])
        if (!isValid) isValidForm = false
        setBook(book => ({
          ...book,
          form: { ...book.form, [field]: book.form?.[field] },
          errors: { ...book.errors, [field]: { isValid, message } },
        }))
      })
      if (!isValidForm) return
      if (equal(toggledType, EDIT)) updateBook()
      else addBook()
    },
    [JSON.stringify(book.form)],
  )

  useEffect(() => {
    if (equal(toggledType, EDIT) && length(keys(bookDetails))) {
      setBook({
        ...book,
        form: {
          ...book.form,
          bookName: bookDetails.name,
          authorName: bookDetails.author,
        },
      })
    }
  }, [toggledType, bookDetails])

  return { book, handleChange, handleSubmit, handleClose, toggledType }
}

export default addBookContainer
