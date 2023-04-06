import React, { useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import {
  fetchCheckAuth,
  resetUser,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

export const withAuth = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
) => {
  // eslint-disable-next-line react/display-name
  return function (props: T) {
    const { replace, pathname } = useRouter()
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector(userSelector)
    const { isActivated } = user.user ?? ''

    const verifyToken = useCallback(async () => {
      if (Cookies.get('accessToken')) {
        await dispatch(fetchCheckAuth())
      }

      if (pathname === '/auth/login' || pathname === '/auth/register') {
        if (isActivated && isAuth) {
          replace('/')
        }
      } else {
        if (!isActivated || !isAuth) {
          replace('auth/login')
        }

        if (!Cookies.get('accessToken')) {
          if (isActivated || isAuth) {
            dispatch(resetUser())
          }
        }
      }
    }, [dispatch, isActivated, isAuth, pathname, replace])

    useEffect(() => {
      verifyToken()
    }, [verifyToken])

    return <WrappedComponent {...props} />
  }
}
