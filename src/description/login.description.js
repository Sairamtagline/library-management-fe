import { email, EMPTY_VALUE, password } from '../utils/constant'

export const INITIAL_STATE = {
  form: { email: EMPTY_VALUE, password: EMPTY_VALUE },
  errors: {},
  isLoading: false,
}

export const fields = [email, password]

export const title = 'Sign In'
