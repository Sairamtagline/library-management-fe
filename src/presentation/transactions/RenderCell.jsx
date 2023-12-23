import { memo } from 'react'

import { tableColumnValues } from '../../description/transactions.description'
import { DUE_DATE_FORMAT } from '../../utils/constant'
import { areEqualProps, dateObject, formatDate } from '../../utils/javascript'

const RenderCell = ({ type, item }) => {
  const renderCell = () => {
    const columnData = {
      [tableColumnValues.book]: item.book?.name,
      [tableColumnValues.transactionType]: item.transactionType,
      [tableColumnValues.dueDate]: formatDate(
        dateObject(item.email),
        DUE_DATE_FORMAT,
      ),
    }

    return columnData[type]
  }
  return renderCell(type, item)
}

export default memo(RenderCell, areEqualProps)
