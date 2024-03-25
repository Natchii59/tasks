import { getDate } from 'date-fns'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'

type CategoriesProps = {
  tasksCount: {
    all: number
    today: number
    upcoming: number
    done: number
  }
}

export function Categories({ tasksCount }: CategoriesProps) {
  const today = getDate(new Date())

  const baseCategories = [
    {
      name: 'All',
      icon: Icons.inbox,
      href: 'all',
      count: tasksCount.all
    },
    {
      name: 'Today',
      icon: Icons.calendar,
      href: 'today',
      isToday: true,
      count: tasksCount.today
    },
    {
      name: 'Upcoming',
      icon: Icons.calendarDays,
      href: 'upcoming',
      count: tasksCount.upcoming
    },
    {
      name: 'Done',
      icon: Icons.check,
      href: 'done',
      count: tasksCount.done
    }
  ]

  return (
    <div className='grid gap-2 sm:grid-cols-2'>
      {baseCategories.map((category, i) => (
        <Link
          key={i}
          href='/'
          className='group relative rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='size-1/4 bg-primary/80 transition-all duration-500 group-hover:h-1/3 group-hover:w-4/5 group-hover:bg-primary/90 group-focus-visible:h-1/3 group-focus-visible:w-4/5 group-focus-visible:bg-primary/90 dark:bg-primary/60 dark:group-hover:bg-primary/70 dark:group-focus-visible:bg-primary/70' />
          </div>

          <div
            className={cn(
              'space-y-2 rounded-md p-4 shadow-sm backdrop-blur-3xl sm:space-y-4 sm:p-6'
            )}
          >
            {category.isToday ? (
              <div className='relative flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-9'>
                <category.icon className='size-5 sm:size-6' />

                <div className='absolute inset-0 top-[7px] flex items-center justify-center sm:top-2'>
                  <p className='text-3xs font-semibold sm:text-2xs'>{today}</p>
                </div>
              </div>
            ) : (
              <div className='flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-9'>
                <category.icon className='size-5 sm:size-6' />
              </div>
            )}

            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold sm:text-2xl'>{category.name}</h3>
              <p className='text-lg font-bold sm:text-xl'>{category.count}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
