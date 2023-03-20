import Cookies from 'js-cookie'
import { IUser, UserTypes } from './res-types'

export const getAccessToken = () => {
  return Cookies.get('accessToken') || null
}

export const getSaveUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensInStorage = (accessJwt: string, refreshJwt: string) => {
  Cookies.set('accessToken', accessJwt)
  Cookies.set('refreshToken', refreshJwt)
}

export const removeFromStorage = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  localStorage.removeItem('user')
}

export const saveUserInStorage = (data: IUser) => {
  const { accessJwt, refreshJwt } = data
  saveTokensInStorage(accessJwt, refreshJwt)
  localStorage.setItem('user', JSON.stringify(data.user))
}
