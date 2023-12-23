import Books from '../pages/Books'
import Dashboard from '../pages/Dashboard'
import Transactions from '../pages/Transactions'
import Users from '../pages/Users'
import Login from '../presentation/Login'
import NotFound from '../presentation/NotFound'
import {
  ADMIN,
  BOOKS_URL,
  DASHBOARD_URL,
  LOGIN_URL,
  TRANSACTIONS_URL,
  USER,
  USERS_URL,
} from '../utils/constant'

export const routes = [
  {
    path: LOGIN_URL,
    Element: Login,
  },
  {
    path: DASHBOARD_URL,
    Element: Dashboard,
    roles: [ADMIN],
  },
  {
    path: BOOKS_URL,
    Element: Books,
    roles: [ADMIN, USER],
  },
  {
    path: USERS_URL,
    Element: Users,
    roles: [ADMIN],
  },
  {
    path: TRANSACTIONS_URL,
    Element: Transactions,
    roles: [USER],
  },
  {
    path: '*',
    Element: NotFound,
  },
]
