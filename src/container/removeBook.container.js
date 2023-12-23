import { useState } from 'react'

import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import { useHandleToast } from '../hooks/useHandleToast'
import {
  getBookState,
  handleEditToggledType,
  setBookList,
} from '../store/slice/book.slice'
import api from '../utils/api'
import { BOOK_API_URL, DELETE } from '../utils/apiPath'
import { EMPTY_VALUE, ERROR_MSG } from '../utils/constant'
import { equal } from '../utils/javascript'

const removeBookContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { bookDetails, bookList } = cusSelector(getBookState)
  const { errorMsg, successMsg } = useHandleToast()

  const handleRemove = async () => {
    setIsLoading(true)
    try {
      const res = await api(DELETE, `${BOOK_API_URL}/${bookDetails?._id}`, true)
      if (res?.status) {
        const clone = { ...bookList }
        const cloneData = [...clone.data]
        const currentInd = cloneData.findIndex(item =>
          equal(item?._id, bookDetails?._id),
        )
        if (!equal(currentInd, -1)) {
          cloneData.splice(currentInd, 1)
          clone.data = cloneData
          cusDispatch(setBookList(clone))
        }
        successMsg(res?.message)
        cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
      } else errorMsg(res?.err?.message || ERROR_MSG)
    } catch (error) {
      setIsLoading(false)
      errorMsg(error?.message || ERROR_MSG)
    }
    setIsLoading(false)
  }

  const handleClose = () => {
    cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
  }

  return { handleRemove, handleClose, isLoading }
}

export default removeBookContainer
