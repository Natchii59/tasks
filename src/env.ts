import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    VERCEL_ENV: z.string().optional(),
    DATABASE_URL: z.string(),
    AUTH_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    EMAIL_FROM: z.string().email()
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL']
  }
})
