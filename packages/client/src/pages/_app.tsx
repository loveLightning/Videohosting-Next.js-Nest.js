import { useState } from 'react'
import { Provider } from 'react-redux'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { persistor, store } from 'src/store'
import { AppTheme, GlobalStyles } from 'src/theme'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={AppTheme}>
              <GlobalStyles />
              <Component {...pageProps} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}
