import { createSelector } from '@reduxjs/toolkit'

import { TypeRootState } from '..'

export const userSelector = createSelector(
  (state: TypeRootState) => state.user,
  (item) => item,
)
