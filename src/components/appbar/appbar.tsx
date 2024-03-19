import { User } from 'next-auth'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
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
          'group gap-x-2 text-2xl font-bold'
        )}
      >
        <Icons.logo className='size-6 text-primary group-hover:animate-wiggle motion-reduce:animate-none' />
        <span>Tasks</span>
      </Link>

      <UserDropdown user={user} />
    </header>
  )
}
