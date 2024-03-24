import createMiddleware from 'next-intl/middleware'

import { locales } from './i18n'

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  localePrefix: 'never'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
