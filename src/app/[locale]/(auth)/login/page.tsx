'use client'

import { useTranslations } from 'next-intl'

import { LoginForm } from '@/components/auth/login-form'
import { Icons } from '@/components/icons'
import { LocalesDropdown } from '@/components/locales-dropdown'
import { ThemeDropdown } from '@/components/theme-dropdown'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const t = useTranslations('LoginPage')

  return (
    <main className='container flex h-screen max-w-lg flex-col items-center justify-center gap-y-4'>
      <h1 className='text-2xl font-bold'>{t('title')}</h1>

      <LoginForm />

      <div className='absolute right-2 top-2 flex items-center gap-x-2'>
        <ThemeDropdown
          align='end'
          triggerAsChild
          trigger={({ icon: IconTheme }) => (
            <Button variant='outline' size='sm' className='gap-x-2'>
              <IconTheme className='size-3' />
              <span>Theme</span>
            </Button>
          )}
        />

        <LocalesDropdown
          align='end'
          triggerAsChild
          trigger={(locale, isPending) => (
            <Button
              variant='outline'
              size='sm'
              className='gap-x-2'
              disabled={isPending}
            >
              <span>{locale.label}</span>
              {isPending ? (
                <Icons.spinner className='size-3 animate-spin' />
              ) : (
                <Icons.chevronsUpDown className='size-3' />
              )}
            </Button>
          )}
        />
      </div>
    </main>
  )
}
