import dayjs from 'dayjs'

import {
  AUTHOR_NAME,
  BOOK_NAME,
  canBeEmpty,
  cardOwner,
  city,
  codeNumber,
  companyLinkedInLink,
  companyName,
  companyWebsiteLink,
  confirmPasswordConst,
  country,
  countryCityNotNull,
  descriptionNotEmpty,
  email,
  first_Name,
  firstName,
  futureDate,
  invalidDateMessage,
  invalidEmailMessage,
  invalidOTPMessage,
  invalidPhoneMessage,
  invalidRange,
  invalidValueMessage,
  job_Title,
  last_Name,
  lastName,
  notEmptyOrNull,
  number,
  numericRange,
  oldPassword,
  otp,
  password,
  passwordMismatchMessage,
  pastDateErrorMessage,
  percentageValue,
  phoneNumber,
  registeredAddress,
  registrationNumber,
  stringValidation,
  termsConditions,
  userName,
  userPassword,
  userSurname,
  zipCode,
  zipCodeMessage,
} from './constant'
import {
  checkPercentageValue,
  convertToTitleCase,
  equal,
  firstCapAndSplit,
  gt,
  isBool,
  isEmpty,
  length,
  lowerCase,
  ternary,
} from './javascript'
import {
  alphabeticStringValidation,
  confirmPassword,
  countryCityCheck,
  emailValidation,
  mobileNumber,
  notEmpty,
  otpValidation,
  passwordCheck,
  removeHtmlTags,
  stringValue,
  validRange,
  webLinkCheck,
  zipCodeValidation,
} from './regex'

let passwordValue = ''

const validateValue = (pattern, value, name, min = null, file = {}) => {
  if (equal(pattern, userPassword) || equal(pattern, password)) {
    passwordValue = value
  }

  switch (pattern) {
    case futureDate:
      if (!value) return { isValid: true }
      return {
        isValid:
          value?.isValid() &&
          value?.isAfter(dayjs().add(30, 'minutes'), 'milliseconds'),
        message: !dayjs(value).isValid()
          ? invalidDateMessage
          : pastDateErrorMessage,
      }

    case canBeEmpty:
      return { isValid: true }

    case notEmptyOrNull:
      return {
        isValid: (notEmpty(value) && !isEmpty(value)) || isBool(value),
        message: `Please provide ${lowerCase(firstCapAndSplit(name))}`,
      }

    case cardOwner:
    case country:
    case city:
    case codeNumber:
    case registeredAddress:
    case registrationNumber:
    case job_Title:
    case first_Name:
    case last_Name:
      return {
        isValid: (notEmpty(value) && !isEmpty(value)) || isBool(value),
        message: `Please provide ${firstCapAndSplit(
          convertToTitleCase(pattern),
        )?.toLowerCase()}`,
      }
    case termsConditions:
      return {
        isValid: ternary(value, true, false),
        message: 'Please agree to terms and service',
      }
    case numericRange:
      return {
        isValid: validRange(+value.from, +value.to),
        message: invalidRange,
      }
    case descriptionNotEmpty:
      return {
        isValid: gt(length(removeHtmlTags(value)), min),
        message: `Minimum ${min} characters are required`,
      }

    case countryCityNotNull:
      return {
        isValid: countryCityCheck(value),
        message: `Please select ${firstCapAndSplit(city)?.toLowerCase()}`,
      }

    case phoneNumber:
      return {
        isValid: (notEmpty(value) && !isEmpty(value)) || isBool(value),
        message: `Please enter ${firstCapAndSplit(pattern)?.toLowerCase()}`,
      }

    case userSurname:
    case BOOK_NAME:
    case AUTHOR_NAME:
    case firstName:
    case lastName:
    case userName:
    case companyName:
      if (!value) {
        return {
          isValid: notEmpty(value),
          message: `Please enter ${firstCapAndSplit(pattern)?.toLowerCase()}`,
        }
      }
      const output = stringValue(value)
      return { isValid: !output, message: output }
    case oldPassword:
    case password:
    case userPassword:
      if (!value) {
        return {
          isValid: notEmpty(value),
          message: `Please enter ${firstCapAndSplit(pattern)?.toLowerCase()}`,
        }
      }
      const res = passwordCheck(value)
      return { isValid: !res, message: res }
    case companyWebsiteLink:
    case companyLinkedInLink:
      const url = webLinkCheck(value)
      return { isValid: !url, message: url }
    case zipCode:
      return { isValid: zipCodeValidation(value), message: zipCodeMessage }
    case email:
      if (!value) {
        return {
          isValid: notEmpty(value),
          message: `Please enter ${firstCapAndSplit(pattern)?.toLowerCase()}`,
        }
      }

      return { isValid: emailValidation(value), message: invalidEmailMessage }
    case otp:
      return { isValid: otpValidation(value), message: invalidOTPMessage }
    case confirmPasswordConst:
      return {
        isValid: confirmPassword(value, passwordValue),
        message: passwordMismatchMessage,
      }
    case number:
      return { isValid: mobileNumber(value), message: invalidPhoneMessage }
    case stringValidation:
      return {
        isValid: alphabeticStringValidation(value),
        message: invalidValueMessage,
      }
    case percentageValue:
      return {
        isValid: checkPercentageValue(value),
        message: invalidValueMessage,
      }
    default:
      return { isValid: false }
  }
}

export default validateValue
