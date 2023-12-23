import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import GridViewIcon from '@mui/icons-material/GridView'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import React from 'react'
import { Link } from 'react-router-dom'

import { LogoutIcon, MenuBookIcon, ReceiptLongIcon } from '../assets/Icons'
import useDispatchAndSelector from '../hooks/useDispatchAndSelector'
import { useNavigate } from '../hooks/useNavigate'
import MList from '../shared/MList'
import MListItem from '../shared/MListItem'
import { setUser } from '../store/slice/dashboard.slice'
import {
  ADMIN,
  DASHBOARD_URL,
  LOGIN_URL,
  ROLE,
  TRANSACTIONS_URL,
  USER,
} from '../utils/constant'
import { checkIncludes } from '../utils/javascript'
import { clearStateFn, loadStateFn } from '../utils/localStorage'
import { MUIStyled } from '../utils/muiStyled'
import MBox from './MBox'
import MStack from './MStack'
import MTypography from './MTypography'

const Sidebar = MUIStyled(MStack)(({ theme, sidebarActive }) => ({
  width: sidebarActive ? 70 : 250,
  position: 'fixed',
  left: 0,
  top: 30,
  bottom: 30,
  borderRadius: '0 30px 30px 0',
  backgroundColor: theme.palette.secondary.darkBlue,
  paddingTop: 20,
  transition: 'all 0.3s ease-in-out',
  zIndex: 9999,
  [theme.breakpoints.down('md')]: {
    width: sidebarActive ? 250 : 70,
  },
  '& .MuiList-root': {
    flex: 1,
    '& .MuiListItem-root': {
      overflow: 'hidden',
      '& a': {
        color: theme.palette.white.main,
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease-in-out',
        '& svg': {
          verticalAlign: 'middle',
          marginRight: 10,
        },
        '& span': {
          opacity: sidebarActive ? 0 : 1,
          visibility: sidebarActive ? 'hidden' : 'visible',
          transition: 'all 0.3s ease-in-out',
          [theme.breakpoints.down('md')]: {
            opacity: sidebarActive ? 1 : 0,
            visibility: sidebarActive ? 'visible' : 'hidden',
          },
        },
      },
    },
  },
  '& span': {
    opacity: sidebarActive ? 0 : 1,
    visibility: sidebarActive ? 'hidden' : 'visible',
    transition: 'all 0.3s ease-in-out',
    [theme.breakpoints.down('md')]: {
      opacity: sidebarActive ? 1 : 0,
      visibility: sidebarActive ? 'visible' : 'hidden',
    },
  },
}))
const MenuIcon = MUIStyled(MBox)(({ theme, sidebarActive }) => ({
  position: 'absolute',
  right: -10,
  top: 30,
  width: 30,
  height: 30,
  backgroundColor: theme.palette.error.main,
  borderRadius: '100%',
  textAlign: 'center',
  lineHeight: '44px',
  color: theme.palette.white.main,
  zIndex: 9,
  cursor: 'pointer',
  transform: `rotate(${sidebarActive ? 0 : '-180deg'})`,
  [theme.breakpoints.down('md')]: {
    transform: `rotate(${!sidebarActive ? 0 : '-180deg'})`,
  },
}))

const MenuList = [
  {
    title: 'Dashboard',
    icon: <GridViewIcon />,
    link: DASHBOARD_URL,
    roles: [ADMIN],
  },
  {
    title: 'Books',
    icon: <MenuBookIcon />,
    link: '/books',
    roles: [USER, ADMIN],
  },
  {
    title: 'Users',
    icon: <PeopleOutlineIcon />,
    link: '/users',
    roles: [ADMIN],
  },
  {
    title: 'Transactions',
    icon: <ReceiptLongIcon />,
    link: TRANSACTIONS_URL,
    roles: [USER],
  },
]

const MSidebar = ({ sidebarActive, onClick }) => {
  const { cusDispatch } = useDispatchAndSelector()
  const { navigate } = useNavigate()
  const logout = () => {
    clearStateFn()
    cusDispatch(setUser(null))
    navigate(LOGIN_URL)
  }

  return (
    <Sidebar sidebarActive={sidebarActive}>
      <MenuIcon onClick={onClick} sidebarActive={sidebarActive}>
        <ChevronRightIcon />
      </MenuIcon>
      <MList>
        {MenuList.map((data, i) => {
          if (checkIncludes(loadStateFn(ROLE), data.roles))
            return (
              <MListItem key={i}>
                <Link to={data?.link}>
                  {data?.icon}
                  <MTypography component="span" variant="body1">
                    {data?.title}
                  </MTypography>
                </Link>
              </MListItem>
            )
          else return null
        })}
      </MList>

      <MTypography
        color="white.main"
        sx={{
          p: 2,
          '& svg': { verticalAlign: 'middle', mr: 1 },
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
        onClick={logout}
      >
        <LogoutIcon />
        <MTypography component="span">Logout</MTypography>
      </MTypography>
    </Sidebar>
  )
}

export default MSidebar
