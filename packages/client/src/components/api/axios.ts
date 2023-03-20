import axios, { AxiosRequestConfig } from 'axios'

import { getContentType } from './api.helper'
import { getAccessToken } from './auth'

export const axiosBase = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

axiosBase.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken()

    if (accessToken && config.headers) {
      config.headers['Authorization'] = accessToken
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosBase.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = err

    if (!config || !config.retry) {
      return Promise.reject(err)
    }
    config.retry -= 1
    const delayRetryRequest = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('retry the request', config.url)
        resolve()
      }, config.retryDelay || 1000)
    })
    return delayRetryRequest.then(() => axiosBase(config))
  },
)
