import { useEffect, useState } from 'react'

import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import {
  getBookState,
  handleEditToggledType,
  handleToggledType,
  setBookList,
} from '../store/slice/book.slice'
import api from '../utils/api'
import { BOOK_API_URL, GET } from '../utils/apiPath'
import {
  ADD,
  BOOK,
  EDIT,
  EMPTY_VALUE,
  ISSUE,
  REMOVE,
  RETURN,
} from '../utils/constant'
import { equal } from '../utils/javascript'
import appContainer from './app.container'

const bookContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { toggledType, bookList } = cusSelector(getBookState)
  const { role } = appContainer()

  const commonModal = [ISSUE, RETURN]

  const toggleState = type => {
    cusDispatch(handleToggledType(type))
  }

  const handleClose = () => {
    if (equal(toggledType, EDIT))
      cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
    else cusDispatch(handleToggledType(EMPTY_VALUE))
  }

  const handleTitle = type => {
    const titleMappings = {
      [EDIT]: EDIT,
      [REMOVE]: REMOVE,
      [ISSUE]: ISSUE,
      [RETURN]: RETURN,
    }
    const title = titleMappings[type] || ADD
    return `${title} ${BOOK}`
  }

  const getBooks = async () => {
    setIsLoading(true)
    const res = await api(GET, BOOK_API_URL, true, {})
    if (res?.status) {
      cusDispatch(setBookList(res))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getBooks()
  }, [])

  const title = handleTitle(toggledType)

  return {
    toggledType,
    toggleState,
    handleClose,
    handleTitle,
    title,
    commonModal,
    isLoading,
    role,
    list: bookList?.data || [],
  }
}

export default bookContainer
