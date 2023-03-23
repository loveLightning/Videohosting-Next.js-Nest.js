import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TypeRootState } from '..'

export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector
