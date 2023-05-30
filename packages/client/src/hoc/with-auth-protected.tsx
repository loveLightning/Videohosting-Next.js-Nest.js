import React, { useCallback, useEffect, useRef } from 'react'
import { AuthService } from '@amazon/common/src'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import {
  resetUser,
  setUser,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

export const withAuthProtected = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  // eslint-disable-next-line react/display-name
  const ComponentWithAuth = (props: T) => {
    const { push, pathname, replace } = useRouter()
    const dispatch = useAppDispatch()
    const {
      user: { user },
    } = useAppSelector(userSelector)
    const initialized = useRef(false)

    const verifyToken = useCallback(async () => {
      if (Cookies.get('accessToken')) {
        try {
          const { data } = await AuthService.checkAuth()

          if (data.accessToken) {
            Cookies.set('accessToken', data.accessToken)
            dispatch(setUser(data))
          }

          if (pathname === '/auth' && user?.isActivated) {
            replace('/')
          }
        } catch (error) {
          push('/auth')
          dispatch(resetUser())
          Cookies.remove('accessToken')
        } finally {
        }
      } else {
        push('/auth')
        dispatch(resetUser())
      }
    }, [dispatch, pathname, push, replace, user?.isActivated])

    useEffect(() => {
      if (!initialized.current) {
        initialized.current = true
        verifyToken()
      }
    }, [verifyToken])

    return <Component {...props} />
  }

  return ComponentWithAuth
}
