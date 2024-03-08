'use client'

import { Analytics } from './analytics'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
      <Analytics />
    </ThemeProvider>
  )
}
