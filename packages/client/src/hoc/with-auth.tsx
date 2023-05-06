import React, { useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import {
  fetchCheckAuth,
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
        try {
          const data = await dispatch(fetchCheckAuth())
          console.log(data)

          replace('/')
          // eslint-disable-next-line prettier/prettier
        } catch (error) { }
      }

      // if (pathname === '/auth') {
      //   if (isActivated && isAuth) {
      //     replace('/')
      //   }
      // } else {
      //   if (!isActivated || !isAuth) {
      //     replace('auth')
      //   }

      //   if (!Cookies.get('accessToken')) {
      //     if (isActivated || isAuth) {
      //       dispatch(resetUser())
      //     }
      //   }
      // }
    }, [dispatch, replace])

    useEffect(() => {
      verifyToken()
    }, [verifyToken])

    return <WrappedComponent {...props} />
  }
}
