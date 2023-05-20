import axios, { AxiosError } from 'axios'

export const errorCatch = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data
  } else {
    return error.message
  }
}
