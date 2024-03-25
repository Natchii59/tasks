'use client'

import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

type ThemeDropdownProps = {
  children: React.ReactNode
  triggerAsChild?: boolean
  triggerClassName?: string
  subMenu?: boolean
  align?: 'center' | 'start' | 'end'
  sideOffset?: number
}

export function ThemeDropdown({
  children,
  triggerAsChild,
  triggerClassName,
  subMenu,
  align,
  sideOffset
}: ThemeDropdownProps) {
  const { theme, setTheme } = useTheme()

  const Provider = subMenu ? DropdownMenuSub : DropdownMenu
  const Trigger = subMenu ? DropdownMenuSubTrigger : DropdownMenuTrigger
  const Content = subMenu ? DropdownMenuSubContent : DropdownMenuContent

  return (
    <Provider>
      <Trigger asChild={triggerAsChild} className={cn(triggerClassName)}>
        {children}
      </Trigger>

      <Content align={align} sideOffset={sideOffset}>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'gap-x-2',
            theme === 'light' && 'bg-accent/90 text-accent-foreground'
          )}
        >
          <Icons.sun className='size-4' />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'gap-x-2',
            theme === 'dark' && 'bg-accent/90 text-accent-foreground'
          )}
        >
          <Icons.moon className='size-4' />
          <span>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'gap-x-2',
            theme === 'system' && 'bg-accent/90 text-accent-foreground'
          )}
        >
          <Icons.laptop className='size-4' />
          <span>System</span>
        </DropdownMenuItem>
      </Content>
    </Provider>
  )
}
