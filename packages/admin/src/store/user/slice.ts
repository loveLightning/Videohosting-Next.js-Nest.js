import { createSlice } from '@reduxjs/toolkit'

import { IUser } from 'src/types'

import {
  fetchCheckAuth,
  fetchLogin,
  fetchLogout,
  fetchRegister,
} from './actions'

enum AuthModeEnum {
  SignIn,
  SignUp,
}

export interface UserState {
  user: IUser
  loading: boolean
  error: unknown
  isAuth: boolean
  authMode: AuthModeEnum
}

const initialState = {
  user: {},
  isAuth: false,
  authMode: AuthModeEnum.SignIn,
  loading: false,
  error: '',
} as UserState

const toolkitSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,

    changeAuthMode: (state) => {
      state.authMode =
        state.authMode === AuthModeEnum.SignIn
          ? AuthModeEnum.SignUp
          : AuthModeEnum.SignIn
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.error = ''
      state.loading = true
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.loading = false
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    }),
      builder.addCase(fetchRegister.pending, (state) => {
        state.error = ''
        state.loading = true
      })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.loading = false
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    }),
      builder.addCase(fetchLogout.pending, (state) => {
        state.error = ''
        state.loading = true
      })
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = {} as IUser
      state.isAuth = false
      state.loading = false
    })
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    }),
      builder.addCase(fetchCheckAuth.pending, (state) => {
        state.error = ''
        state.loading = true
      })
    builder.addCase(fetchCheckAuth.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.loading = false
    })
    builder.addCase(fetchCheckAuth.rejected, (state, action) => {
      state.user = {} as IUser
      state.isAuth = false
      state.error = action.payload
      state.loading = false
    })
  },
})

export const { resetUser, changeAuthMode } = toolkitSlice.actions

export default toolkitSlice.reducer
