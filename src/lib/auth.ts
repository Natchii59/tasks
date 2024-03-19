import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/nodemailer'

import { LoginEmail, LoginEmailText } from '@/emails/login-email'
import { env } from '@/env'

import { db } from './prisma'
import { resend } from './resend'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      allowDangerousEmailAccountLinking: true
    }),
    GoogleProvider({
      allowDangerousEmailAccountLinking: true
    }),
    EmailProvider({
      server: {},
      sendVerificationRequest: async ({ identifier, url }) => {
        const { host } = new URL(url)

        await resend.emails.send({
          from: `Natchi Tasks <${env.EMAIL_FROM}>`,
          to: identifier,
          subject: `Sign in to ${host}`,
          react: LoginEmail({ url, host }),
          text: LoginEmailText({ url, host })
        })
      }
    })
  ],
  useSecureCookies: process.env.NODE_ENV === 'production',
  pages: {
    signIn: '/login',
    verifyRequest: '/auth/verify-email'
  },
  session: {
    updateAge: 60 * 60, // 1 hour
    maxAge: 60 * 60 * 24 * 7 // 1 week
  }
})
