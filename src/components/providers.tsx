'use client'

import { SessionProvider } from 'next-auth/react'

import { Analytics } from './analytics'
import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
        <Analytics />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
