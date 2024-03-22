'use client'

import { List } from '@prisma/client'
import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { FormControl } from '../ui/form'

type ListsComboboxProps = {
  lists: Pick<List, 'id' | 'name'>[]
  selectedListId: string | null
  setSelectedListId: (listId: string | null) => void
  formControl?: boolean
}

export function ListsCombobox({
  lists,
  selectedListId,
  setSelectedListId,
  formControl
}: ListsComboboxProps) {
  const [open, setOpen] = useState<boolean>(false)

  const isDesktop = useMediaQuery('(min-width: 768px)')

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
            >
              <span
                className={cn(
                  'truncate font-normal',
                  !selectedListId && 'text-muted-foreground'
                )}
              >
                {lists.find(list => list.id === selectedListId)?.name ??
                  'No list'}
              </span>
              <Icons.chevronsUpDown className='size-4 shrink-0 text-muted-foreground' />
            </Button>
          </ButtonProvider>
        </PopoverTrigger>
        <PopoverContent className='p-0' align='start'>
          <ListsList
            selectedListId={selectedListId}
            setSelectedListId={handleSelect}
            lists={lists}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <ButtonProvider>
          <Button variant='outline' className='w-full justify-between gap-x-1'>
            <span
              className={cn(
                'truncate font-normal',
                !selectedListId && 'text-muted-foreground'
              )}
            >
              {lists.find(list => list.id === selectedListId)?.name ??
                'No list'}
            </span>
            <Icons.chevronsUpDown className='size-4 shrink-0 text-muted-foreground' />
          </Button>
        </ButtonProvider>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <ListsList
            selectedListId={selectedListId}
            setSelectedListId={handleSelect}
            lists={lists}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

type ListsListProps = {
  selectedListId: string | null
  setSelectedListId: (status: string | null) => void
  lists: Pick<List, 'id' | 'name'>[]
}

function ListsList({
  selectedListId,
  setSelectedListId,
  lists
}: ListsListProps) {
  return (
    <Command>
      <CommandInput placeholder='Filter lists...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {lists.map(list => (
            <CommandItem
              key={list.id}
              value={list.name}
              onSelect={() => setSelectedListId(list.id)}
              className='gap-x-2'
            >
              <Icons.check
                className={cn(
                  'size-4 shrink-0',
                  selectedListId === list.id ? 'opacity-100' : 'opacity-0'
                )}
              />
              {list.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
