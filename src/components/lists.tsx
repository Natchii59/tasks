import Link from 'next/link'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

import { Icons, type IconType } from './icons'
import { buttonVariants } from './ui/button'

type List = {
  id: string
  name: string
  icon?: string | null
  tasksCount: number
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
}

export function Lists({ lists: baseLists, tasksWithNoList }: ListsProps) {
  const lists: ListWithIcon[] = useMemo(() => {
    const lists = baseLists.slice()
    lists.unshift({
      id: 'tasks',
      name: 'Tasks',
      tasksCount: tasksWithNoList
    })

    return lists.map(list => ({
      ...list,
      icon: list.icon ? Icons[list.icon as keyof typeof Icons] : Icons.list
    }))
  }, [baseLists, tasksWithNoList])

  return (
    <div className='grid gap-y-2'>
      {lists.map(list => (
        <Link
          key={list.id}
          href={`/lists/${list.id}`}
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'flex justify-normal gap-x-2'
          )}
        >
          <list.icon className='size-5 text-primary' />

          <span className='flex-1 font-semibold'>{list.name}</span>

          <span className='text-sm font-medium'>{list.tasksCount}</span>

          <Icons.chevronRight
            className='size-4 text-muted-foreground'
            strokeWidth={3}
          />
        </Link>
      ))}
    </div>
  )
}
