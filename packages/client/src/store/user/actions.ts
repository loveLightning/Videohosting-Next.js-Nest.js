import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/' +
          (category ? 'category/' + category : ''),
      )
      const data = await response.json()

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchProduct = createAsyncThunk(
  'goods/fetchProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
