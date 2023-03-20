'use client'
import { ThemeProvider } from 'styled-components'

import { AppTheme, GlobalStyles, StyledComponentsRegistry } from 'src/theme'

import Head from './head'
// import { AuthProvider } from 'src/context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ThemeProvider theme={AppTheme}>
            {children}
            {/* <AuthProvider>{children}</AuthProvider> */}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
