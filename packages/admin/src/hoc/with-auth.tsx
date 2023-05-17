import React, { useCallback, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { fetchCheckAuth, useAppDispatch } from 'src/store'

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  // eslint-disable-next-line react/display-name
  const ComponentWithAuth = (props: T) => {
    const { push, pathname, replace } = useRouter()
    const dispatch = useAppDispatch()
    const initialized = useRef(false)

    const verifyToken = useCallback(async () => {
      if (Cookies.get('accessToken')) {
        try {
          await dispatch(fetchCheckAuth()).unwrap()

          if (pathname === '/auth') {
            replace('/')
          }
        } catch (error) {
          push('/auth')
        } finally {
        }
      } else {
        push('/auth')
      }
    }, [dispatch, pathname, push, replace])

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
