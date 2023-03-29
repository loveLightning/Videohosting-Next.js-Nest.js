import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthService, StorageService } from 'src/api'
import { AuthLogin, AuthRegister, IUser } from 'src/types'

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (data: AuthLogin, { rejectWithValue }) => {
    try {
      const response: IUser = await AuthService.login(data)

      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (data: AuthRegister, { rejectWithValue }) => {
    try {
      const response: IUser = await AuthService.register(data)

      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchCheckAuth = createAsyncThunk(
  'auth/access-token',
  async (_, { rejectWithValue }) => {
    try {
      const response: IUser = await AuthService.getNewTokens()

      return response
    } catch (error) {
      StorageService.removeFromStorage()

      return rejectWithValue(error)
    }
  },
)
