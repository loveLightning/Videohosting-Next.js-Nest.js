import { useCallback, useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { AuthService } from '@amazon/common/src'
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
import { Loader } from 'src/components'
import { persistor, resetUser, setUser, store, useAppDispatch } from 'src/store'
import { AppTheme, GlobalStyles } from 'src/theme'

type ComponentProps = Pick<AppProps, 'Component' | 'pageProps'>

interface Context {
  ctx: {
    req?: NextApiRequest
    res?: NextApiResponse
    pathname: string
  }
}

const queryClient = new QueryClient()

const WrappedComponent = ({ Component, pageProps }: ComponentProps) => {
  const initialized = useRef(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const checkAuthAsync = useCallback(async () => {
    setIsLoading(true)

    if (Cookies.get('accessToken')) {
      try {
        const { data } = await AuthService.checkAuth()

        if (data.accessToken) {
          Cookies.set('accessToken', data.accessToken)
          dispatch(setUser(data))
        }
      } catch (err) {
        const error = err as AxiosError

        if (error?.response?.status === 401) {
          dispatch(resetUser())
          Cookies.remove('accessToken')
          router.replace('/auth')
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      dispatch(resetUser())
      router.replace('/auth')
    }
    setIsLoading(false)
  }, [dispatch, router])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      checkAuthAsync()
    }
  }, [checkAuthAsync])

  return <>{isLoading ? <Loader /> : <Component {...pageProps} />}</>
}

function MyApp({ Component, pageProps }: AppProps) {
  api

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={AppTheme}>
              <GlobalStyles />

              <WrappedComponent Component={Component} pageProps={pageProps} />
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
