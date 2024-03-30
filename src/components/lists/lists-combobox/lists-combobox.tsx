'use client'

import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { Icons } from '../../icons'
import { FormControl } from '../../ui/form'
import { getLists } from './get-lists'
import { ListsCommand } from './lists-command'

type ListsComboboxProps = {
  selectedListId: string | null
  setSelectedListId: (listId: string | null) => void
  formControl?: boolean
}

export function ListsCombobox({
  selectedListId,
  setSelectedListId,
  formControl
}: ListsComboboxProps) {
  const [open, setOpen] = useState<boolean>(false)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { data: lists, isLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: () => getLists()
  })

  function handleSelect(list: string | null) {
    setSelectedListId(list)
    setOpen(false)
  }

  const ButtonProvider = formControl ? FormControl : React.Fragment

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <ButtonProvider>
            <Button
              variant='outline'
              className='w-full justify-between gap-x-1'
              disabled={isLoading}
            >
              <span
                className={cn(
                  'truncate font-normal',
                  !selectedListId && 'text-muted-foreground'
                )}
              >
                {!isLoading && lists
                  ? lists.find(l => l.id === selectedListId)?.name ?? 'No list'
                  : 'Loading...'}
              </span>

              {isLoading ? (
                <Icons.spinner className='size-4 shrink-0 animate-spin text-muted-foreground' />
              ) : (
                <Icons.chevronsUpDown className='size-4 shrink-0 text-muted-foreground' />
              )}
            </Button>
          </ButtonProvider>
        </PopoverTrigger>
        <PopoverContent className='p-0' align='start'>
          {!isLoading && lists && (
            <ListsCommand
              lists={lists}
              selectedListId={selectedListId}
              setSelectedListId={handleSelect}
            />
          )}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <ButtonProvider>
          <Button
            variant='outline'
            className='w-full justify-between gap-x-1'
            disabled={isLoading}
          >
            <span
              className={cn(
                'truncate font-normal',
                !selectedListId && 'text-muted-foreground'
              )}
            >
              {!isLoading && lists
                ? lists.find(l => l.id === selectedListId)?.name ?? 'No list'
                : 'Loading...'}
            </span>
            {isLoading ? (
              <Icons.spinner className='size-4 shrink-0 animate-spin text-muted-foreground' />
            ) : (
              <Icons.chevronsUpDown className='size-4 shrink-0 text-muted-foreground' />
            )}
          </Button>
        </ButtonProvider>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          {!isLoading && lists && (
            <ListsCommand
              lists={lists}
              selectedListId={selectedListId}
              setSelectedListId={handleSelect}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
