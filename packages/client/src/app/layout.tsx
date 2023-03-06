'use client'
import { ThemeProvider } from 'styled-components'

import { AppTheme, GlobalStyles, StyledComponentsRegistry } from 'src/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ThemeProvider theme={AppTheme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
