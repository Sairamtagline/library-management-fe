import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import querystring from 'querystring'

import {
  ASC_SORT,
  BOOLEAN,
  EMPTY_COUNT,
  MIN_ONE,
  MIN_VALUE,
  n,
  NUMBER,
  OBJECT,
  RETURN_NEGATIVE,
  RETURN_POSITIVE,
  STRING,
  y,
} from './constant'
import { loadStateFn, saveStateFn } from './localStorage'
import { remainder } from './math'
import { firstLetterCap, notEmpty } from './regex'
import { minusSymbol } from './symbols'
import validateValue from './validation'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(relativeTime)

export const ternary = (bool, truthy, falsy) => (bool ? truthy : falsy)

export const equal = (obj1, obj2) => obj1 === obj2

export const head = obj => obj?.[0]

export const last = obj => obj?.[length(obj) - 1]

export const length = obj => obj?.length

export const entries = obj => (obj ? Object.entries(obj) : [])

export const values = object => (object ? Object.values(object) : [])

export const keys = object => (object ? Object.keys(object) : [])

export const isEmpty = value => {
  if (typeOf(value, STRING) && isEmptyString(value)) return true
  if (typeOf(value, OBJECT) && lte(length(keys(value)), 0)) return true
  if (!value) return true
  return false
}

export const isEmptyString = value =>
  equal(value, '') || checkUndefined(value) || equal(value, null)

export const lowerCase = value => value?.toLowerCase()

export const spaceBetween = value =>
  value?.replace(/([A-Z|0-9|_])/g, ' $1').trim()

export const isArray = obj => Array.isArray(obj)

export const checkVal = val => val ?? ''

export const getName = (firstName, lastName) => {
  const name = `${checkVal(firstName)} ${checkVal(lastName)}`
  if (notEmpty(name)) return spaceBetween(name)
  return minusSymbol
}

export const checkUndefined = obj => equal(obj, undefined)

export const checkStringValue = obj =>
  !checkUndefined(obj) &&
  !equal(obj, 'undefined') &&
  !equal(obj, 'null') &&
  !equal(obj, null)

export const isBool = value => typeOf(value, BOOLEAN)

export const notNull = value => !equal(value, null)

export const checkIncludes = (value, array) => array.includes(value)

export const subtractNumbers = (...numbers) =>
  ternary(
    !gt(length(numbers)),
    EMPTY_COUNT,
    numbers.reduce((accumulator, currentValue) => accumulator - currentValue),
  )

export const modifyNumber = value => {
  const number = value?.toString().split('.')
  if (number) {
    if (gte(length(head(number)), 5)) {
      number[0] = head(number).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
    if (number[1] && gte(length(number[1]), 5)) {
      number[1] = number[1].replace(/(\d{3})/g, '$1,')
    }
  }
  return number?.join('.')
}

export const capitalizeString = val =>
  upperCase(val?.charAt(0)) + lowerCase(val?.slice(1))

export const replaceChar = val => val.replace(/_/g, ' ')

export const replaceAllChar = (
  val,
  characterToBeReplaced,
  replacingCharacter,
) => val.replaceAll(characterToBeReplaced, replacingCharacter)

export const getBoolean = val => ternary(val, y, n)

export const numberLocale = (num, locale = 'en-US') =>
  Number(num)?.toLocaleString(locale)

export const getMissingNumberArray = betWeenVal => {
  const missing = [betWeenVal[0]]
  for (let i = betWeenVal[0]; i <= betWeenVal[1]; i += 1) {
    if (equal(indexOf(betWeenVal, i), -1)) {
      missing.push(i)
    }
  }
  return [...missing, betWeenVal[1]]
}

// eslint-disable-next-line no-restricted-globals
export const numberArray = array => !array.some(isNaN)

export const multiFilter = (array, filters) => {
  const filterKeys = keys(filters)
  return array?.filter(item =>
    filterKeys?.every(key => {
      if (!filters[key]?.length) return true
      if (getKeyType(filters[key]) && gt(length(filters[key]), MIN_ONE))
        return filters[key].reduce(
          (cur, prev) => item[key] <= prev && gte(item[key], cur) && item[key],
        )
      return filters[key]?.includes(item[key])
    }),
  )
}
const getKeyType = array => {
  const isValidNumber = array.every(element => typeOf(element, NUMBER))
  if (isValidNumber) return isValidNumber
  if (!isValidNumber) {
    return array.every(element => {
      const date = new Date(element)
      return date instanceof Date && !Number.isNaN(date.valueOf())
    })
  }
  return false
}
export const getOriginalValueForTimeFTE = {
  '100%': [100],
  '<100% - 80%': [80, 99],
  '<80% - 50%': [50, 79],
  '<50%': [0, 49],
}
export const getTimeFTE = {
  100: '100%',
  '<100% - 80%': [80, 99],
  '<80% - 50%': [50, 79],
  '<50%': [0, 49],
}

export const getSkeletonsLength = (array = []) =>
  length(array) -
  length(
    array
      ?.map(
        ({ options }) =>
          !options.display &&
          !checkUndefined(options.display) &&
          !options.display,
      )
      ?.filter(Boolean),
  )

export const findTotal = (key, data) =>
  data?.reduce((n, { [key]: totalVal }) => n + totalVal, 0)

export const findUniqueFromArrayObject = (array, key) => [
  ...new Map(array?.map(item => [item[key], item])).values(),
]

export const findAndReplaceById = (array, replacement) => {
  const index = array.findIndex(item => equal(item.id, replacement.id))
  if (~index) {
    array[index] = replacement
  }

  return array
}

export const typeOf = (val, type) => equal(typeof val, type)

export const gt = (param1, param2 = 0) => param1 > param2

export const lt = (param1, param2 = 0) => param1 < param2

export const gte = (param1, param2 = 0) => param1 >= param2

export const lte = (param1, param2 = 0) => param1 <= param2

export const upperCase = value => value?.toUpperCase()

export const checkPercentageValue = value => gte(value, 0) && lte(value, 100)

export const indexOf = (string, val) => string?.indexOf(val)

export const getFractionalNumber = (number, fixWith = 2) =>
  ternary(
    !typeOf(number, STRING),
    +ternary(
      !equal(+number % MIN_ONE, MIN_VALUE),
      number?.toFixed(fixWith),
      number,
    ),
    number,
  )

export const returnValue = (val, key) =>
  ternary(typeOf(val, OBJECT), val?.[key], val)

export const takeSubString = (string, from, to) => string?.substr(from, to)

export const getCurrentDate = format => currentDateObject().format(format)

export const truthySome = param =>
  isArray(param) ? param?.some(val => val) : values(param)?.some(val => val)

export const truthyEvery = param =>
  isArray(param) ? param?.every(val => val) : values(param)?.every(val => val)

export const spliceData = (arr, start = MIN_VALUE, end = MIN_ONE) =>
  arr.splice(start, end)

export const sortArrayOfObject = (arr, key, sortDirection = ASC_SORT) =>
  arr?.sort((a, b) =>
    ternary(
      gt(lowerCase(a?.[key]), lowerCase(b?.[key])),
      ternary(equal(sortDirection, ASC_SORT), RETURN_POSITIVE, RETURN_NEGATIVE),
      ternary(
        gt(lowerCase(b?.[key]), lowerCase(a?.[key])),
        ternary(
          equal(sortDirection, ASC_SORT),
          RETURN_NEGATIVE,
          RETURN_POSITIVE,
        ),
        0,
      ),
    ),
  )

export const allFalse = obj =>
  Object.values(obj).every(val => equal(val, false))
export const filterObject = (obj, unneededKey) =>
  Object.keys(obj)
    .filter(key => key !== unneededKey)
    .reduce((acc, key) => {
      acc[key] = [obj[key]]
      return acc
    }, {})

export const prefixWithZero = value => (value <= 9 ? `0${value}` : value)

export const toBoolean = value => equal(value, 'true')

export const pascalCase = inputString => {
  const words = inputString.split(' ')

  if (equal(length(words), 0)) return ''

  const camelCasedWords = []

  for (let i = 0; lt(i, length(words)); i++) {
    const word = words[i]
    if (gt(length(word), 0)) {
      const capitalizedWord =
        upperCase(word.charAt(0)) + lowerCase(word.slice(1))
      camelCasedWords.push(capitalizedWord)
    }
  }

  const camelCaseString = camelCasedWords.join(' ')

  return camelCaseString
}

export const splitCamelCase = obj => obj?.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

export const firstCapAndSplit = key => firstLetterCap(splitCamelCase(key))

export const removeUniqueArray = (arr, type = '_id') => {
  const uniqueIds = []
  const unique = arr.filter(element => {
    const isDuplicate = uniqueIds.includes(element[type])
    if (!isDuplicate) {
      uniqueIds.push(element[type])
      return true
    }
    return false
  })
  return unique
}

export const uniqueArray = (arr = []) => [...new Set(arr)]

export const convertToTitleCase = str => {
  // Replace underscores with spaces
  var convertedString = str.replace(/_/g, ' ')

  // Capitalize the first letter of each word
  convertedString = convertedString.replace(/\w\S*/g, word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  return convertedString
}

export const getLocalStorageData = req => {
  if (typeof window !== 'undefined') {
    return loadStateFn(req)
  }
  return undefined
}

export const checkErrors = (formValues, notIncludes) => {
  let errors = {}
  Object.keys(formValues).forEach(fieldName => {
    if (!formValues[fieldName] && !notIncludes.includes(fieldName)) {
      errors[fieldName] = {
        isValid: false,
        message: `${firstCapAndSplit(fieldName)} is required`,
      }
    }
  })
  return errors
}

export const mbFileSize = size => (size / 1024 / 1024).toFixed(1)

export const kbFileSize = size => (size / 1024).toFixed(1)

export const fileSize = size =>
  ternary(
    kbFileSize(size) > 512,
    `${mbFileSize(size)} MB`,
    `${kbFileSize(size)} KB`,
  )

export const mimeType = (name = '') => last(name.split('.'))

export const fileNameFromUrl = (url = '') => last(url.split('/'))

export const removeMimeType = (name = '') =>
  name.split('.').slice(0, -1).join('.')

export const calculatePercentage = (percentage, total) => {
  if (typeof total !== 'number' || typeof percentage !== 'number') {
    return 0
  }

  const result = (percentage / 100) * total
  return result.toFixed(2)
}

export const queryString = (obj = {}) => querystring.stringify(obj)

export const withSuffix = number => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const rem = remainder(number, 100)

  return (
    number +
    (suffixes[remainder(rem - 20, 10)] || suffixes[rem] || head(suffixes))
  )
}

export const getCurrentMonth = () => {
  const currentDate = new Date()
  const currentMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  })

  return currentMonthName
}

export const ManageErrorList = item => {
  const validationErrors = {}
  keys(item).forEach(name => {
    const err = validateValue(name, item[name])
    if (!err?.isValid) {
      validationErrors[name] = {
        isValid: err?.isValid,
        message: err?.message,
      }
    }
  })
  return validationErrors
}

export const objPropertyValue = (obj, keys = '') => {
  const properties = keys.split('.')
  let value = obj

  for (const prop of properties) value = value?.[prop]

  return value
}

export const userNameInitials = name => {
  if (!name) return ''

  const splittedName = name.trim().split(' ')

  return equal(length(splittedName), 1)
    ? upperCase(head(splittedName).charAt(0))
    : gte(length(splittedName), 2)
      ? `${upperCase(head(splittedName).charAt(0))}${upperCase(
          last(splittedName).charAt(0),
        )}`
      : ''
}

export const setPropertiesToUndefined = (object = {}, propertiesArray = []) => {
  const filteredObject = keys(object).reduce((acc, key) => {
    if (!checkIncludes(key, propertiesArray)) acc[key] = object[key]

    return acc
  }, {})

  return filteredObject
}

export const handleSalaryFormat = value => {
  const unformattedValue = value?.toString().replace(/,/g, '')
  let formattedValue = Number(unformattedValue).toLocaleString()
  return formattedValue
}

export function getOrdinal(number) {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const index = number % 100
  const suffix = suffixes[(index - 20) % 10] || suffixes[index] || suffixes[0]
  return number + suffix
}

export function formatPlusValue(value = 0) {
  return value > 0 ? `+${value}` : value
}

export function getYesOrNo(value) {
  return value ? 'Yes' : 'No'
}

export const formatSalary = salary => {
  if (!salary) return ''

  if (lt(salary, 1000)) return salary.toString()
  else if (lt(salary, 10000)) return (salary / 1000).toFixed(1) + 'K'
  else if (lt(salary, 100000)) return (salary / 1000).toFixed(0) + 'K'
  else return (salary / 100000).toFixed(1) + 'M'
}

export const replaceAllOccurrences = (
  inputString,
  targetSubstring,
  replacementString,
) => inputString.split(targetSubstring).join(replacementString)

export const handleModalConformation = (isAdd, key, subKey) => {
  if (isAdd) {
    const val = JSON.parse(loadStateFn(key))
    if (!val || !length(keys(val))) {
      saveStateFn(key, JSON.stringify({ [subKey]: 'yes' }))
    } else {
      val[subKey] = 'yes'
      saveStateFn(key, JSON.stringify(val))
    }
  } else {
    const val = JSON.parse(loadStateFn(key))
    if (val && val.hasOwnProperty(subKey)) {
      delete val[subKey]
    }
    saveStateFn(key, JSON.stringify(val))
  }
}

export const getLocalObjectData = key => {
  const val = JSON.parse(loadStateFn(key))
  return val
}
export const formatDate = (date, format) => dayjs(date).format(format)

export const formatDateObject = (date, format) => date.format(format)

export const currentISOTime = () => dayjs().toISOString()

export const currentDateObject = () => dayjs()

export const dateObject = (date, format) =>
  ternary(format, dayjs(date, format), dayjs(date))

export const currentTimeZone = () => dayjs.tz.guess()

export const getTimeZoneDate = (date, format, timezone) =>
  dayjs.tz(date, format, timezone)

export const dateDuration = (startDate, endDate) =>
  dayjs.duration(endDate.diff(startDate))

export const getDateFromISOString = dateStr => head(dateStr?.split('T'))

export const messageSentTime = date => {
  const dateObj = dateObject(date)
  const currentDate = currentDateObject()

  const diffInSeconds = currentDate.diff(dateObj, 'seconds')
  if (lt(diffInSeconds, 60)) return `${diffInSeconds}s`
  else {
    const diffInMinutes = currentDate.diff(dateObj, 'minutes')
    if (lt(diffInMinutes, 60)) return `${diffInMinutes}m`
    else {
      const diffInHours = currentDate.diff(dateObj, 'hours')
      if (lt(diffInHours, 24)) return `${diffInHours}h`
      else {
        const diffInDays = currentDate.diff(dateObj, 'days')
        if (lt(diffInDays, 30)) return `${diffInDays}d`
        else {
          const diffInMonths = currentDate.diff(dateObj, 'months')
          if (lt(diffInMonths, 13)) return `${diffInMonths}mo`
          else {
            const diffInYears = currentDate.diff(dateObj, 'years')
            return `${diffInYears}y`
          }
        }
      }
    }
  }
}

export const arraysAreEqual = (array1 = [], array2 = []) => {
  if (!equal(length(array1), length(array2))) return false

  const frequencyMap = new Map()
  array1.forEach(element => {
    frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1)
  })

  array2.forEach(element => {
    const frequency = frequencyMap.get(element)
    if (!frequency) return false

    if (equal(frequency, 1)) frequencyMap.delete(element)
    else frequencyMap.set(element, frequency - 1)
  })

  return equal(frequencyMap.size, 0)
}

export const isCharacterCountValid = value => {
  return value.length > 2600
}

export const isValidTimeFormat = time => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  return timeRegex.test(time)
}

export const isTimeGreaterThan = (a, b) => {
  const [hoursA, minutesA] = a.split(':').map(Number)
  const [hoursB, minutesB] = b.split(':').map(Number)
  const timeA = new Date(0, 0, 0, hoursA, minutesA)
  const timeB = new Date(0, 0, 0, hoursB, minutesB)
  return timeA >= timeB
}

export const checkTime = (firstTime, secondTime) => {
  const startTime = formatDate(firstTime, 'HH:mm')
  const endTime = formatDate(secondTime, 'HH:mm')

  return (
    isValidTimeFormat(startTime) &&
    isValidTimeFormat(endTime) &&
    isTimeGreaterThan(startTime, endTime)
  )
}

export const areEqualProps = (prev, next) =>
  equal(JSON.stringify(prev), JSON.stringify(next))

export const next = value => value + MIN_ONE
