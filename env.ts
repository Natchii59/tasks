import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    VERCEL_ENV: z.string().optional()
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL']
  }
})
