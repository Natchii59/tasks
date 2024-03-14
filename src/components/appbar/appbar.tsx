import { User } from 'next-auth'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import { UserDropdown } from './user-dropdown'

type AppbarProps = {
  user: User
}

export function Appbar({ user }: AppbarProps) {
  return (
    <header className='flex h-14 items-center justify-between'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'none', size: 'none' }),
          'text-2xl font-bold'
        )}
      >
        Tasks
      </Link>

      <UserDropdown user={user} />
    </header>
  )
}
