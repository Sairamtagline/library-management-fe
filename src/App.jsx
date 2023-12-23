import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import appContainer from './container/app.container'
import { routes } from './description/routes.description'
import MBox from './shared/MBox'
import MSidebar from './shared/MSidebar'
import MStack from './shared/MStack'
import theme from './theme'
import { EMPTY_ARRAY } from './utils/constant'
import { checkIncludes, ternary } from './utils/javascript'
import { MUIStyled } from './utils/muiStyled'

const MainWrapper = MUIStyled(MStack)(({ theme }) => ({
  position: 'relative',
  padding: 16,
  [theme.breakpoints.down('sm')]: {
    padding: '16px 0',
  },
}))

const MainContent = MUIStyled(MBox)(({ theme, sidebarActive, role }) => ({
  flex: 1,
  marginLeft: !role ? 0 : sidebarActive ? 70 : 250,
  padding: !role ? 0 : 30,
  overflowX: 'auto',
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.down('md')]: {
    marginLeft: !role ? 0 : 70,
    padding: !role ? 0 : 20,
  },
}))

const App = () => {
  const { role } = appContainer()
  const [sidebarActive, setSidebarActive] = useState()

  const handleMenuToggle = () => {
    setSidebarActive(!sidebarActive)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainWrapper direction="row">
        <Router>
          {role && (
            <MSidebar
              onClick={handleMenuToggle}
              sidebarActive={sidebarActive}
              role={role}
            />
          )}
          <MainContent role={role} sidebarActive={sidebarActive}>
            <Routes>
              {routes.map(({ Element, ...route }, index) =>
                ternary(
                  !route.roles ||
                    (route.roles &&
                      checkIncludes(role, route.roles || EMPTY_ARRAY)),
                  <Route key={index} path={route.path} element={<Element />} />,
                ),
              )}
            </Routes>
          </MainContent>
        </Router>
      </MainWrapper>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
