import api from './api'
import { invalidPhoneMessage, notEmptyMessage, STRING } from './constant'
import {
  checkIncludes,
  equal,
  gt,
  kbFileSize,
  length,
  lowerCase,
  lt,
  mimeType,
  ternary,
  typeOf,
} from './javascript'

export const emailValidation = email => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(lowerCase(email))
}

export const otpValidation = otp =>
  otp ? equal(otp.toString().length, 5) : false

export const confirmPassword = (confirmPass, pass) => equal(confirmPass, pass)

export const alphabeticStringValidation = val => {
  const regex = /^[a-zA-Z0-9@äëïöüÿÄËÏÖÜŸ)/(._-\s]+$/
  return regex.test(val)
}

export const passwordCheck = password => {
  if (password.length < 8) return 'At least 8 characters'

  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[^\w\d\s]).{8,}$/

  if (!regex.test(password)) {
    return 'Your password is incorrect. Please try again'
  }
}

export const alphaNumericValidation = val => {
  const regex = /^[A-Z0-9]{6}$/
  return regex.test(val)
}

export const number = val => {
  const regex = /^[0-9]+$/
  return regex.test(val)
}

export const mobileNumber = val => {
  const regex = /^[0-9]+$/
  return regex.test(val) && equal(val.toString().length, 10)
}

export const notEmpty = val => {
  const regex = /[^\s]$/
  return ternary(val, regex.test(val), false)
}

export const countryNumberValidation = val => {
  const regex = /^[0-9]{10,}$/
  return ternary(val, regex.test(val), false)
}

export const checkNotEmptyWithSpace = val => {
  const regex = /[^\s]$/
  return val ? regex.test(val.replace(/^\s+|\s+$/gm, '')) : false
}

export const stringValue = val => {
  const emptyRegex = /[^\s]$/
  const isEmptyRegex = ternary(val, emptyRegex.test(val), false)
  if (!isEmptyRegex) {
    return notEmptyMessage
  }
  const regex = /^[a-zA-Z]([\w -]*[a-zA-Z])?$/
  if (!regex.test(val)) return 'Sorry! No special characters or numbers'
}

export const webLinkCheck = val => {
  const emptyRegex = /[^\s]$/
  const isEmptyRegex = ternary(val, emptyRegex.test(val), false)
  if (!isEmptyRegex) {
    return notEmptyMessage
  }

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  if (!urlRegex.test(val)) {
    return 'Please provide a valid web url'
  }
}

export const isDate = date => {
  const regExp = [
    /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+$/,
  ]
  return regExp[0].test(date) || regExp[1].test(date)
}

export const zipCodeValidation = value => {
  const regExp = /^[0-9]+$/
  return regExp.test(value)
}

export const isNumber = val => /^\d+$/.test(val)

export const firstLetterCap = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const fileValidation = file => {
  const isValidSize = lt(
    parseInt(kbFileSize(file.fileSize)) || 0,
    parseInt(kbFileSize(file.acceptedSize)) || 0,
  )
  const isValidType = checkIncludes(mimeType(file.fileName), file.acceptedTypes)

  return { isValid: isValidSize && isValidType, isValidSize, isValidType }
}

export const countryCityCheck = address => address.id

export const phoneNumberCheck = async value => {
  const res = await api('POST', 'accounts/phone-number-validation/', false, {
    phone_number: `+${value}`,
  })

  return {
    isValid: res.status ? true : false,
    message: invalidPhoneMessage,
  }
}

export const formattedNumber = value => {
  const unformattedValue = value?.toString().replace(/,/g, '')
  const isValid = isNumber(unformattedValue)
  const formattedValue = Number(unformattedValue).toLocaleString()

  return ternary(isValid, formattedValue, 0)
}

export const onInputPercent = (e, onChange) => {
  let value = e?.target?.value || ternary(equal(typeOf(e), STRING), e, '')
  if (gt(+value, 100)) {
    value = 100
    onChange(100)
  } else {
    onChange(value)
  }
  return value
}

export const removeHtmlTags = (str = '') =>
  str?.replace(/(<([^>]+)>)/gi, '') || ''

export const validRange = (from = 0, to = 0) => from && to && gt(to, from)

export const validRebateTime = value =>
  value &&
  gt(length(value), 0) &&
  value.every(v => v.percentage || v.is_free_replacement)
