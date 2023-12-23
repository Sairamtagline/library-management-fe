export const INITIAL_STATE = {
  isLoading: false,
  results: [],
}

export const tableColumnValues = {
  book: 'book',
  transactionType: 'transactionType',
  dueDate: 'dueDate',
}

export const columns = [
  { title: 'Book', value: tableColumnValues.book },
  { title: 'Transaction Type', value: tableColumnValues.transactionType },
  { title: 'Return Date', value: tableColumnValues.dueDate },
]
