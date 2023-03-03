import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
