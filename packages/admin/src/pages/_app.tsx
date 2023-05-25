import { useCallback, useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { AuthService, IUser } from '@amazon/common/src'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { api } from 'src/api'
import { persistor, setUser, store, useAppDispatch } from 'src/store'
import { AppTheme, GlobalStyles } from 'src/theme'

type ComponentProps = Pick<AppProps, 'Component' | 'pageProps'> & {
  user?: IUser
}

interface Context {
  ctx: {
    req?: NextApiRequest
    res?: NextApiResponse
    pathname: string
  }
}

const queryClient = new QueryClient()

const WrappedComponent = ({ Component, pageProps, user }: ComponentProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
    }
  }, [dispatch, user])

  return <Component {...pageProps} />
}

function MyApp({ Component, pageProps }: AppProps) {
  api

  const [user, setUser] = useState<IUser | undefined>(undefined)
  const initialized = useRef(false)
  const router = useRouter()
  const checkAuthAsync = useCallback(async () => {
    try {
      if (Cookies.get('accessToken')) {
        const { data } = await AuthService.checkAuth()
        Cookies.set('accessToken', data.accessToken)
        setUser(data)
      }
    } catch (err) {
      const error = err as AxiosError

      if (error?.response?.status === 401) {
        router.replace('/auth')
      }
    }
  }, [router])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      checkAuthAsync()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={AppTheme}>
              <GlobalStyles />

              <WrappedComponent
                Component={Component}
                pageProps={pageProps}
                user={user}
              />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }: Context) => {
  if (ctx !== undefined) {
    const data = ctx.req?.cookies.refreshToken

    if (!data && ctx.pathname !== '/auth') {
      ctx.res?.writeHead(301, { Location: '/auth' }).end()
    } else if (data && ctx.pathname === '/auth') {
      ctx.res?.writeHead(301, { Location: '/' }).end()
    }

    return {
      props: {},
    }
  }
}

export default MyApp
