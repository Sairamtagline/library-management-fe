import { useState } from 'react'

import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import { useHandleToast } from '../hooks/useHandleToast'
import {
  getBookState,
  handleEditToggledType,
  setBookList,
} from '../store/slice/book.slice'
import api from '../utils/api'
import { BOOK_ISSUE_API_URL, BOOK_RETURN_API_URL, POST } from '../utils/apiPath'
import { EMPTY_VALUE, ERROR_MSG, RETURN } from '../utils/constant'
import { equal } from '../utils/javascript'
import usersContainer from './users/users.container'

const issueAndReturnContainer = () => {
  const [bookData, setBookData] = useState({
    selectedUser: '',
    dueDate: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { cusDispatch, cusSelector } = useDispatchAndSelector()
  const { toggledType, bookDetails, bookList } = cusSelector(getBookState)
  const { errorMsg, successMsg } = useHandleToast()

  const { users } = usersContainer()

  const handleChange = event => {
    if (event?.target) {
      setBookData({ ...bookData, selectedUser: event?.target.value })
    } else {
      setBookData({ ...bookData, dueDate: event })
    }
  }

  const handleClose = () => {
    cusDispatch(handleEditToggledType({ type: EMPTY_VALUE, data: {} }))
  }

  const handleAPICall = async (url, method, payload) => {
    setIsLoading(true)
    try {
      const res = await api(method, url, true, payload)
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
      } else {
        errorMsg(res?.err?.message || ERROR_MSG)
      }
    } catch (error) {
      setIsLoading(false)
      errorMsg(error?.message || ERROR_MSG)
    }
    setIsLoading(false)
  }

  const handleIssueAPI = async () => {
    const payload = {
      userId: bookData?.selectedUser,
      dueDate: bookData?.dueDate?.toISOString(),
    }

    await handleAPICall(
      `${BOOK_ISSUE_API_URL}/${bookDetails._id}`,
      POST,
      payload,
    )
  }

  const handleReturnAPI = async () => {
    await handleAPICall(`${BOOK_RETURN_API_URL}/${bookDetails._id}`, POST, {})
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (equal(toggledType, RETURN)) handleReturnAPI()
    else handleIssueAPI()
  }

  return {
    toggledType,
    bookData,
    handleClose,
    handleChange,
    handleSubmit,
    isLoading,
    userList: users?.results || [],
  }
}

export default issueAndReturnContainer
