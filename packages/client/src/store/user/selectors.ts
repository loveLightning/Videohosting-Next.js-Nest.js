import { createSelector } from '@reduxjs/toolkit'
import { TypeRootState } from '..'

export const goodsSelector = createSelector(
  (state: TypeRootState) => state.goods.goods,
  (item) => item,
)

export const productSelector = createSelector(
  (state: TypeRootState) => state.goods.product,
  (item) => item,
)
