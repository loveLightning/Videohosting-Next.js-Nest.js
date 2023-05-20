import { AuthLogin, AuthService, Role } from '@amazon/common/src'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (data: AuthLogin, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(data)

      if (Role.ADMIN === response.data.user.role) {
        const { accessToken } = response.data
        Cookies.set('accessToken', accessToken)
      }

      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchCheckAuth = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.checkAuth()
      const { accessToken } = response.data

      Cookies.set('accessToken', accessToken)

      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout()

      Cookies.remove('accessToken')
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
