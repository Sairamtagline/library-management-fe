import { Fragment, memo } from 'react'

import { equal, gt, length } from '../../utils/javascript'
import { MUIStyled } from '../../utils/muiStyled'
import MStack from '../MStack'
import MTable from './MTable'
import MTableBody from './MTableBody'
import MTableCell from './MTableCell'
import MTableHead from './MTableHead'
import MTableRow from './MTableRow'

const TableWrapper = MUIStyled(MStack)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTable-root': {
    minWidth: 1160,
    '& .MuiTableHead-root': {
      position: 'sticky',
      top: 0,
      zIndex: 99,
      '& .MuiTableRow-root': {
        '& .MuiTableCell-root': {
          backgroundColor: theme.palette.secondary.darkBlue,
          border: 0,
          color: theme.palette.white.main,
          fontWeight: '700',
          textTransform: 'uppercase',
          position: 'relative',
          padding: 15,
          top: 0,
          zIndex: 9,
          [theme.breakpoints.down('sm')]: {
            padding: 8,
          },
          whiteSpace: 'nowrap',
          '&:not(:last-child):before': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 15,
            bottom: 15,
            borderRight: `1px solid #79849926`,
          },
          '&:last-child': {
            borderRadius: '0 8px 8px 0',
          },
          '&:first-child': {
            borderRadius: '8px 0 0 8px',
          },
        },
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        '& .MuiTableCell-root': {
          border: 0,
          padding: 5,
          position: 'relative',
          whiteSpace: 'nowrap',
        },
        '&:nth-child(even)': {
          '& .MuiTableCell-root': {
            backgroundColor: 'transparent',
            borderBottom: `1px solid ${theme.palette.natural.gray}`,
            padding: 15,
            color: theme.palette.white.main,
            [theme.breakpoints.down('sm')]: {
              padding: 8,
            },
            '&:not(:last-child):before': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 15,
              bottom: 15,
              borderRight: `1px solid ${theme.palette.natural.gray}`,
            },
            '&:last-child': {
              borderRadius: '0 8px 0 0',
            },
            '&:first-child': {
              borderRadius: '8px 0 0 0',
            },
          },
          '&:hover': {
            '& .MuiTableCell-root': {
              backgroundColor: theme.palette.secondary.darkBlue,
            },
          },
        },
      },
    },
  },
}))

const RowTable = props => {
  return (
    gt(length(props.data)) && (
      <TableWrapper {...props}>
        <MTable>
          <MTableHead>
            <MTableRow>
              {props.columns?.map((column, index) => {
                return <MTableCell key={index + 11}>{column.title}</MTableCell>
              })}
            </MTableRow>
          </MTableHead>
          <MTableBody>
            {props.data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <MTableRow>
                    <MTableCell></MTableCell>
                  </MTableRow>
                  <MTableRow key={index}>
                    {props.columns?.map((column, index) => {
                      return (
                        <MTableCell key={index + 11111}>
                          {props.renderCell(column.value, item)}
                        </MTableCell>
                      )
                    })}
                  </MTableRow>
                </Fragment>
              )
            })}
          </MTableBody>
        </MTable>
      </TableWrapper>
    )
  )
}

const areEqualProps = (prev, next) =>
  equal(JSON.stringify(prev.data), JSON.stringify(next.data)) &&
  equal(JSON.stringify(prev.columns), JSON.stringify(next.columns))

export default memo(RowTable, areEqualProps)
