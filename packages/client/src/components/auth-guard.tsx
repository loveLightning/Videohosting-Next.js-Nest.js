import { useRouter } from 'next/router'

import { userSelector } from 'src/store'
import { useAppSelector } from 'src/store/hooks'

interface Props {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { data } = useAppSelector(userSelector)
  const router = useRouter()

  if (data) {
    return <>{children}</>
  }

  if (!data) {
    router.pathname !== '/auth/login' && router.replace('/auth/login')

    return null
  }

  return null
}
