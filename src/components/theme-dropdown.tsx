'use client'

import { useTheme } from 'next-themes'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

import { Icons, IconType } from './icons'
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
  trigger: (props: { theme?: string; icon: IconType }) => React.ReactNode
  triggerAsChild?: boolean
  triggerClassName?: string
  subMenu?: boolean
  align?: 'center' | 'start' | 'end'
  sideOffset?: number
}

export function ThemeDropdown({
  trigger,
  triggerAsChild,
  triggerClassName,
  subMenu,
  align,
  sideOffset
}: ThemeDropdownProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const IconTheme = useMemo(() => {
    if (resolvedTheme === 'dark') {
      return Icons.moon
    } else {
      return Icons.sun
    }
  }, [resolvedTheme])

  const Provider = subMenu ? DropdownMenuSub : DropdownMenu
  const Trigger = subMenu ? DropdownMenuSubTrigger : DropdownMenuTrigger
  const Content = subMenu ? DropdownMenuSubContent : DropdownMenuContent

  return (
    <Provider>
      <Trigger asChild={triggerAsChild} className={cn(triggerClassName)}>
        {trigger({ theme: resolvedTheme, icon: IconTheme })}
      </Trigger>

      <Content align={align} sideOffset={sideOffset}>
        <DropdownMenuItem onClick={() => setTheme('light')} className='gap-x-2'>
          <Icons.sun className='size-4' />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')} className='gap-x-2'>
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
      </Content>
    </Provider>
  )
}
