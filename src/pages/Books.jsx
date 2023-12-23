import React, { memo } from 'react'

import AuthWrapper from '../hoc/AuthWrapper'
import BookList from '../presentation/BookList'

const Books = () => {
  return <BookList />
}

export default AuthWrapper(memo(Books))
