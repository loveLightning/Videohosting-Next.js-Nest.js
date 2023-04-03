import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import {
  fetchCheckAuth,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

export const withAuth = <T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>,
) => {
  // eslint-disable-next-line react/display-name
  return function (props: T) {
    const { replace } = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)

    const verifyToken = () => {
      if (!user.isAuth) {
        replace('/auth/login')
      }
    }

    useEffect(() => {
      if (Cookies.get('accessToken')) {
        dispatch(fetchCheckAuth())
      }

      verifyToken()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (user.isAuth && user.user.user.isActivated) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}
