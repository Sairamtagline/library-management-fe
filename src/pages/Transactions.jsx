import React from 'react'

import AuthWrapper from '../hoc/AuthWrapper'
import TransactionsPage from '../presentation/transactions'

const Transactions = () => {
  return <TransactionsPage />
}

export default AuthWrapper(Transactions)
