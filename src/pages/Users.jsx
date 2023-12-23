import React from 'react'

import AuthWrapper from '../hoc/AuthWrapper'
import UsersPage from '../presentation/users'

const Users = () => {
  return <UsersPage />
}

export default AuthWrapper(Users)
