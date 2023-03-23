import { createSelector } from '@reduxjs/toolkit'

import { TypeRootState } from '..'

export const userSelector = createSelector(
  (state: TypeRootState) => state,
  (item) => item,
)
