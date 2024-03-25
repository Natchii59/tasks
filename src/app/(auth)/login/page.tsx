import { LoginForm } from '@/components/auth/login-form'
import { Icons } from '@/components/icons'
import { ThemeDropdown } from '@/components/theme-dropdown'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <main className='container flex h-screen max-w-lg flex-col items-center justify-center gap-y-4'>
      <h1 className='text-2xl font-bold'>Sign in to your account</h1>

      <LoginForm />

      <div className='absolute right-2 top-2'>
        <ThemeDropdown align='end' triggerAsChild>
          <Button variant='outline' size='sm' className='gap-x-2'>
            <Icons.sun className='size-3 dark:hidden' />
            <Icons.moon className='hidden size-3 dark:block' />
            <span>Theme</span>
          </Button>
        </ThemeDropdown>
      </div>
    </main>
  )
}
