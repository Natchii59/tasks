'use client'

import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { LocalesDropdown } from '../locales-dropdown'
import { ThemeDropdown } from '../theme-dropdown'
import { buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { UserAvatar } from '../user-avatar'

type UserDropdownProps = {
  user: User
}

export function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ size: 'none', variant: 'none' }),
          'size-8 rounded-full focus-visible:ring-offset-1'
        )}
      >
        <UserAvatar name={user.name} image={user.image} className='size-8' />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-52'>
        <DropdownMenuLabel className='flex flex-col gap-y-px whitespace-nowrap'>
          <span className='overflow-x-hidden text-ellipsis'>
            Hi {user.name ?? 'there'}!
          </span>
          {user.email && (
            <span className='overflow-x-hidden text-ellipsis text-xs font-normal text-muted-foreground'>
              {user.email}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuItem className='gap-x-2' asChild>
          <Link href='/settings'>
            <Icons.userSettings className='size-4' />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>

        <ThemeDropdown
          subMenu
          sideOffset={4}
          triggerClassName='gap-x-2'
          trigger={({ icon: IconTheme }) => (
            <>
              <IconTheme className='size-4' />
              <span>Theme</span>
            </>
          )}
        />

        <LocalesDropdown
          subMenu
          sideOffset={4}
          triggerClassName='gap-x-2'
          trigger={locale => (
            <>
              <Icons.lang className='size-4' />
              <span>{locale.label}</span>
            </>
          )}
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='gap-x-2 text-destructive focus:text-destructive'
          onClick={() => signOut()}
        >
          <Icons.logout className='size-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
