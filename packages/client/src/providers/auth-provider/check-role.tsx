import { useRouter } from 'next/router'

import { userSelector } from 'src/store'
import { useAppSelector } from 'src/store/hooks'

import { RoleTypes } from './types'

export const CheckRole = ({ children, Component: { isUser } }: RoleTypes) => {
  const { data } = useAppSelector(userSelector)

  const router = useRouter()

  if (!data) {
    router.pathname !== '/auth/login' && router.replace('/auth/login')

    return null
  }

  if (data && isUser) return <>{children}</>
}
