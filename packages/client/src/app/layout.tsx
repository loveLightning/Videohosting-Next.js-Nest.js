'use client'
import { StyledComponentsRegistry } from 'src/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
    </html>
  )
}

