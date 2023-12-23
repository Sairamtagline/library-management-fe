import axios from 'axios'

import { APP_TOKEN } from './constant'
import { isArray } from './javascript'
import { loadStateFn } from './localStorage'

const api = async (method, endpoint, isToken, body) => {
  try {
    const baseURL = process.env.REACT_APP_API_URL
    const token = loadStateFn(APP_TOKEN)

    const config = {
      url: `${baseURL}/${endpoint}`,
      method,
      headers: {},
      data: body,
    }
    if (isToken) config.headers['Authorization'] = 'Bearer ' + token

    const res = await axios(config)

    return {
      status: true,
      ...res.data,
      arrayResponse: isArray(res.data) ? res.data : undefined,
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)

    return {
      err: err.response?.data,
      status: false,
      statusCode: err.response?.status,
    }
  }
}

export default api
