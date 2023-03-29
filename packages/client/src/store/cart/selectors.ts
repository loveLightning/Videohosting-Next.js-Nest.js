import { createSelector } from '@reduxjs/toolkit'

import { TypeRootState } from '..'

export const cartSelector = createSelector(
  (state: TypeRootState) => state.cart,
  (item) => item,
)
