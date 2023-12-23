import authContainer from '../container/auth.container'

const AuthWrapper = WrappedComponent => {
  return props => {
    authContainer()

    return <WrappedComponent {...props} />
  }
}

export default AuthWrapper
