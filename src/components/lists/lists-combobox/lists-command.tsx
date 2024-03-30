'use client'

import { List } from '@prisma/client'

import { cn } from '@/lib/utils'

import { Icons } from '../../icons'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../../ui/command'

type ListsCommandProps = {
  lists: List[]
  selectedListId: string | null
  setSelectedListId: (status: string | null) => void
}

export function ListsCommand({
  lists,
  selectedListId,
  setSelectedListId
}: ListsCommandProps) {
  return (
    <Command>
      <CommandInput placeholder='Filter lists...' />
      <CommandList>
        <CommandEmpty>No lists found.</CommandEmpty>

        <CommandGroup>
          {lists.map(list => (
            <CommandItem
              key={list.id}
              value={list.name}
              onSelect={() => {
                setSelectedListId(selectedListId === list.id ? null : list.id)
              }}
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
