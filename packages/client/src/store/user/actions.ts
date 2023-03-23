import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthService } from 'src/api'
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

// export const fetchIsCheckAuth = createAsyncThunk(
//   'auth/register',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await AuthService.getNewTokens()

//       return response.data
//     } catch (error) {
//       removeFromStorage()

//       return rejectWithValue(error)
//     }
//   },
// )
