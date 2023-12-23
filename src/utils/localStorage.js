import { checkStringValue, ternary } from './javascript'

export const loadStateFn = params => {
  const value = localStorage.getItem(params)
  return ternary(checkStringValue(value), value, null)
}

export const saveStateFn = (key, value) => localStorage.setItem(key, value)

export const clearStateFn = () => localStorage.clear()

export const removeStateFn = key => localStorage.removeItem(key)
