'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

const locales = [
  { locale: 'en', label: 'English' },
  { locale: 'fr', label: 'Français' }
]

type LocaleItem = {
  locale: string
  label: string
}

type LocalesDropdownProps = {
  trigger: (locale: LocaleItem, isPending: boolean) => React.ReactNode
  triggerAsChild?: boolean
  triggerClassName?: string
  subMenu?: boolean
  align?: 'center' | 'start' | 'end'
  sideOffset?: number
}

export function LocalesDropdown({
  trigger,
  triggerAsChild,
  triggerClassName,
  subMenu,
  align,
  sideOffset
}: LocalesDropdownProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleSelect(locale: string) {
    startTransition(() => {
      router.replace(`/${locale}/${pathname}`)
    })
  }

  const Provider = subMenu ? DropdownMenuSub : DropdownMenu
  const Trigger = subMenu ? DropdownMenuSubTrigger : DropdownMenuTrigger
  const Content = subMenu ? DropdownMenuSubContent : DropdownMenuContent

  return (
    <Provider>
      <Trigger asChild={triggerAsChild} className={cn(triggerClassName)}>
        {trigger(locales.find(l => l.locale === locale)!, isPending)}
      </Trigger>

      <Content align={align} sideOffset={sideOffset}>
        {locales.map(locale => (
          <DropdownMenuItem
            key={locale.locale}
            onClick={() => handleSelect(locale.locale)}
          >
            {locale.label}
          </DropdownMenuItem>
        ))}
      </Content>
    </Provider>
  )
}
