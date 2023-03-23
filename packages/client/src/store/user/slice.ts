import { createSlice } from '@reduxjs/toolkit'

import { IUser } from 'src/types'

import { fetchLogin, fetchRegister } from './actions'

export interface UserState {
  user: IUser
  loading: boolean
  error: string
}

const initialState = {
  user: {},
  loading: false,
  error: '',
} as UserState

const toolkitSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.error = ''
      state.loading = true
    }),
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      }),
      builder.addCase(fetchLogin.rejected, (state) => {
        state.error = 'error'
        state.loading = false
      })
    builder.addCase(fetchRegister.pending, (state) => {
      state.error = ''
      state.loading = true
    }),
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.error = 'error'
        state.loading = false
      })
  },
})

export default toolkitSlice.reducer
