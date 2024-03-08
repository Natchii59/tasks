import type { Metadata, Viewport } from 'next'

import { Providers } from '@/components/providers'
import { configSite } from '@/config/site'

import '@/styles/globals.css'

import { fontInter } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: configSite.name,
    template: `%s | ${configSite.name}`
  },
  description: configSite.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI'
  ],
  authors: [
    {
      name: 'Natchi',
      url: 'https://natchi.fr'
    }
  ],
  creator: 'Natchi',
  metadataBase: new URL(configSite.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: configSite.url,
    title: {
      default: configSite.name,
      template: `%s | ${configSite.name}`
    },
    description: configSite.description,
    siteName: configSite.name
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: configSite.name,
      template: `%s | ${configSite.name}`
    },
    description: configSite.description
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  themeColor: 'var(--background)'
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          fontInter.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
