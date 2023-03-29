import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { StorageService } from 'src/api'
import { useAppSelector, userSelector } from 'src/store'
import { fetchCheckAuth, useAppDispatch } from 'src/store'

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext(null)
const { Provider } = AuthContext

export const AuthProvider = ({ children }: Props) => {
  const { pathname, push } = useRouter()
  const { data } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()

  const accessToken = StorageService.getAccessToken()

  useEffect(() => {
    const accessToken = StorageService.getAccessToken()

    if (!accessToken && data) {
      dispatch(fetchCheckAuth())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const refreshToken = StorageService.getRefreshToken()

    if (!accessToken || (!data && window.location.pathname !== '/auth/login')) {
      push('/auth/login')
    }

    if (!refreshToken && data) {
      StorageService.removeFromStorage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <Provider value={null}>{children}</Provider>
}

export const useAuthContext = () => useContext(AuthContext)
