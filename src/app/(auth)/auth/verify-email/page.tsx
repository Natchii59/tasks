'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyEmailPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/')
    }
  }, [status, router])

  return (
    <div className='container flex h-screen max-w-xl flex-col items-center justify-center'>
      <h1 className='mb-4 text-4xl font-bold'>Verify your email</h1>

      <p className='text-center'>
        We have sent you an email with a link to verify your account. When you
        have verified your email, the page will automatically update.
      </p>

      <p className='text-center text-sm text-muted-foreground'>
        If you don&apos;t see the email, please check your spam folder.
      </p>
    </div>
  )
}
