import React from 'react'

import AuthWrapper from '../hoc/AuthWrapper'
import MStack from '../shared/MStack'
import MTypography from '../shared/MTypography'

const NotFound = () => {
  return (
    <MStack
      justifyContent="center"
      alignItems="center"
      minHeight={{ sm: 250, xs: 100 }}
    >
      <MTypography
        fontSize={{ sm: '32px', xs: '18px' }}
        lineHeight={{ sm: '38px', xs: ' 20px' }}
        color="white.main"
        fontWeight="700"
        textAlign="center"
      >
        Page Not Found
      </MTypography>
    </MStack>
  )
}

export default AuthWrapper(NotFound)
