import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { StorageService } from 'src/api'
import { userSelector } from 'src/store'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { fetchCheckAuth } from 'src/store/user/actions'

import { RoleTypes } from './types'

const DynamicCheckRole = dynamic<RoleTypes>(() => import('./check-role'), {
  ssr: false,
})

export const AuthProvider = ({
  children,
  Component: { isUser },
}: RoleTypes) => {
  const { pathname } = useRouter()
  const { data } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const accessToken = StorageService.getAccessToken()

    if (!accessToken && data) {
      dispatch(fetchCheckAuth())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const refreshToken = StorageService.getRefreshToken()

    if (!refreshToken && data) {
      StorageService.removeFromStorage()
    }
  }, [pathname, data])

  return isUser ? (
    <DynamicCheckRole Component={{ isUser }}>{children}</DynamicCheckRole>
  ) : (
    <>{children}</>
  )
}
