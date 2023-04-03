import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { AuthService } from 'src/api'
import { AuthLogin, AuthRegister } from 'src/types'

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (data: AuthLogin, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(data)

      const { accessToken } = response.data
      Cookies.set('token', accessToken)

      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (data: AuthRegister, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(data)

      const { accessToken } = response.data
      Cookies.set('accessToken', accessToken)

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
