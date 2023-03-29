import { createSlice } from '@reduxjs/toolkit'

import { StorageService } from 'src/api'
import { IUser } from 'src/types'

import { fetchCheckAuth, fetchLogin, fetchRegister } from './actions'

export interface UserState {
  data: IUser
  loading: boolean
  error: string
}

const initialState = {
  data: StorageService.getSaveUser(),
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
        state.data = action.payload
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
        state.data = action.payload
        state.loading = false
      }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.error = 'error'
        state.loading = false
      })
    builder.addCase(fetchCheckAuth.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export default toolkitSlice.reducer
