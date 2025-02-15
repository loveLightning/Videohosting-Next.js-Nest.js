import { IUser } from '@amazon/common/src'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchCheckAuth, fetchLogin, fetchLogout } from './actions'

export interface UserState {
  user: IUser
  loading: boolean
  error: unknown
  isAuth: boolean
}

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
  error: '',
} as UserState

const toolkitSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    setUser(state: UserState, { payload }: PayloadAction<IUser>) {
      state.user = payload
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

export const { resetUser, setUser } = toolkitSlice.actions

export default toolkitSlice.reducer
