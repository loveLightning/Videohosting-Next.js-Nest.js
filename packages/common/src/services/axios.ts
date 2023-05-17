import axios from 'axios'

export const axiosBase = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})
