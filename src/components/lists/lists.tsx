import { List as BaseList } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

import { Icons, type IconType } from '../icons'
import { buttonVariants } from '../ui/button'
import { ListContextMenu } from './list-context-menu'

type List = BaseList & {
  iconKey?: string | null
  tasksCount: number
  isBase?: boolean
}

type ListsProps = {
  lists: List[]
  taskCountFromBaseList: number
}

type ListWithIcon = List & {
  icon: IconType
}

export function Lists({ lists: baseLists, taskCountFromBaseList }: ListsProps) {
  const lists: ListWithIcon[] = useMemo(() => {
    const lists = baseLists.slice()
    lists.unshift({
      id: 'tasks',
      name: 'Tasks',
      tasksCount: taskCountFromBaseList,
      isBase: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: ''
    })

    return lists.map(list => ({
      ...list,
      icon: list.iconKey
        ? Icons[list.iconKey as keyof typeof Icons]
        : Icons.list
    }))
  }, [baseLists, taskCountFromBaseList])

  return (
    <div className='grid gap-y-2'>
      {lists.map(({ icon: ListIcon, ...list }) => (
        <ListContextMenu key={list.id} list={list}>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'flex min-w-0 justify-normal gap-x-2'
            )}
          >
            <ListIcon className='size-5 text-primary' />

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
