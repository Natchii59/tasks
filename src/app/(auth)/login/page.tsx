import { LoginForm } from '@/components/auth/login-form'

export default async function LoginPage() {
  return (
    <main className='container flex h-screen max-w-lg flex-col items-center justify-center gap-y-4'>
      <h1 className='text-2xl font-bold'>Sign in to your account</h1>

      <LoginForm />
    </main>
  )
}
