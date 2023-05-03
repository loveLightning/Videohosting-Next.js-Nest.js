import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAddToCartPayload, ICartItem, ICHangeQuantityPayload } from 'src/types'

export interface ICartInitialState {
  items: ICartItem[]
}

const initialState: ICartInitialState = {
  items: [],
}

const toolkitSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExist = state.items.some(
        (el) => el.product.id === action.payload.product.id,
      )

      if (!isExist) {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter(
        (el) => el.product.id !== action.payload.id,
      )
    },

    changeQuantity: (state, action: PayloadAction<ICHangeQuantityPayload>) => {
      const { id, type } = action.payload

      const item = state.items.find((el) => el.product.id === id)

      if (item) {
        if (type === 'plus') {
          item.quantity++
        } else {
          if (item.quantity === 1) {
            item.quantity = 1
          } else {
            item.quantity--
          }
        }
      }
    },

    resetCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, changeQuantity, removeFromCart, resetCart } =
  toolkitSlice.actions

export default toolkitSlice.reducer
