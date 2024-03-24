import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import { Providers } from '@/components/providers'
import { configSite } from '@/config/site'
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

type RootLocaleLayoutProps = React.PropsWithChildren<{
  params: { locale: string }
}>

export default function RootLocaleLayout({
  children,
  params
}: RootLocaleLayoutProps) {
  const messages = useMessages()

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          fontInter.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
