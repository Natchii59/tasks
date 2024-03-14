'use client'

import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { UserAvatar } from '../user-avatar'

type UserDropdownProps = {
  user: User
}

export function UserDropdown({ user }: UserDropdownProps) {
  const { theme, setTheme } = useTheme()

  const IconTheme = useMemo(() => {
    if (theme === 'dark') {
      return Icons.moon
    } else {
      return Icons.sun
    }
  }, [theme])

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
            <Icons.settings className='size-4' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='gap-x-2'>
            <IconTheme className='size-4' />
            <span>Theme</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent sideOffset={4}>
            <DropdownMenuItem
              onClick={() => setTheme('light')}
              className='gap-x-2'
            >
              <Icons.sun className='size-4' />
              <span>Light</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setTheme('dark')}
              className='gap-x-2'
            >
              <Icons.moon className='size-4' />
              <span>Dark</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setTheme('system')}
              className='gap-x-2'
            >
              <Icons.laptop className='size-4' />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

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
