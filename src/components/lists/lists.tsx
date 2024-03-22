import Link from 'next/link'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

import { Icons, type IconType } from '../icons'
import { buttonVariants } from '../ui/button'
import { ListContextMenu } from './list-context-menu'

type List = {
  id: string
  name: string
  icon?: string | null
  tasksCount: number
  isDefault?: boolean
}

type ListsProps = {
  lists: List[]
  tasksWithNoList: number
}

type ListWithIcon = {
  id: string
  name: string
  icon: IconType
  tasksCount: number
  isDefault?: boolean
}

export function Lists({ lists: baseLists, tasksWithNoList }: ListsProps) {
  const lists: ListWithIcon[] = useMemo(() => {
    const lists = baseLists.slice()
    lists.unshift({
      id: 'tasks',
      name: 'Tasks',
      tasksCount: tasksWithNoList,
      isDefault: true
    })

    return lists.map(list => ({
      ...list,
      icon: list.icon ? Icons[list.icon as keyof typeof Icons] : Icons.list
    }))
  }, [baseLists, tasksWithNoList])

  return (
    <div className='grid gap-y-2'>
      {lists.map(list => (
        <ListContextMenu
          key={list.id}
          list={{ id: list.id, name: list.name, isDefault: list.isDefault }}
        >
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'flex min-w-0 justify-normal gap-x-2'
            )}
          >
            <list.icon className='size-5 text-primary' />

            <span className='flex-1 truncate font-semibold'>{list.name}</span>

            <span className='text-sm font-medium'>{list.tasksCount}</span>

            <Icons.chevronRight
              className='size-4 text-muted-foreground'
              strokeWidth={3}
            />
          </Link>
        </ListContextMenu>
      ))}
    </div>
  )
}
