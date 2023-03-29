import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAddToCartPayload, ICartItem, ICHangeQuantityPayload } from 'src/types'

export interface ICartInitialState {
  items: ICartItem[]
}
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
        state.items.push({ ...action.payload, id: state.items.length })
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((el) => el.id === action.payload.id)
    },

    changeQuantity: (state, action: PayloadAction<ICHangeQuantityPayload>) => {
      const { id, type } = action.payload

      const item = state.items.find((el) => el.id === id)
      if (item) type === 'plus' ? item.quantity++ : item.quantity--
    },

    reset: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, changeQuantity, removeFromCart, reset } =
  toolkitSlice.actions

export default toolkitSlice.reducer
