import { createSlice } from '@reduxjs/toolkit'

import { IUser } from 'src/types'

import { fetchGoods, fetchProduct } from './actions'

export interface UserState {
  user?: IUser
  loading: boolean
  error: string
}

const initialState: UserState = {
  loading: false,
  error: '',
}

const toolkitSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.error = ''
      state.loading = true
    }),
      builder.addCase(fetchGoods.fulfilled, (state, action) => {
        state.goods.data = action.payload
        state.goods.loading = false
      }),
      builder.addCase(fetchGoods.rejected, (state) => {
        state.goods.error = 'error'
        state.goods.loading = false
      })
    builder.addCase(fetchProduct.pending, (state) => {
      state.product.error = ''
      state.product.loading = true
    }),
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.product.data = action.payload
        state.product.loading = false
      }),
      builder.addCase(fetchProduct.rejected, (state) => {
        state.product.error = 'error'
        state.product.loading = false
      })
  },
})

export default toolkitSlice.reducer
