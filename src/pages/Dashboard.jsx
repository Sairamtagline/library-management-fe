import React from 'react'

import dashboardContainer from '../container/dashboard.container'
import MGrid from '../shared/MGrid'
import MStack from '../shared/MStack'
import MTypography from '../shared/MTypography'
import { EMPTY_COUNT } from '../utils/constant'
import { MUIStyled } from '../utils/muiStyled'

const DashboardCard = MUIStyled(MStack)(({ theme }) => ({
  background: `linear-gradient(180deg,${theme.palette.primary.main}, ${theme.palette.primary.blue})`,
  padding: 20,
  borderRadius: 30,
  textAlign: 'center',
}))

const DashboardCards = ({ title, count, color = true }) => {
  return (
    <MGrid item md={3} sm={6} xs={12}>
      <DashboardCard>
        <MTypography
          variant="h6"
          component="h6"
          color="white.main"
          textTransform="capitalize"
        >
          {title}
        </MTypography>
        <MTypography
          variant="h4"
          component="h4"
          color={color ? 'white.main' : 'error.light'}
          fontWeight={600}
        >
          {count}
        </MTypography>
      </DashboardCard>
    </MGrid>
  )
}

const Dashboard = () => {
  const { dashboardCounts } = dashboardContainer()

  return (
    <MGrid container spacing={3}>
      <DashboardCards
        title="Total Issued Books"
        count={dashboardCounts?.totalIssued || EMPTY_COUNT}
      />
      <DashboardCards
        title="Today Issued Books"
        count={dashboardCounts?.todaysIssued || EMPTY_COUNT}
      />
      <DashboardCards
        title="Today Dues Books"
        count={dashboardCounts?.todaysDue || EMPTY_COUNT}
        color={false}
      />
      <DashboardCards
        title="Due missed Books"
        count={dashboardCounts?.dueMissed || EMPTY_COUNT}
        color={false}
      />
    </MGrid>
  )
}

export default Dashboard
