import { endOfToday, startOfToday, startOfTomorrow } from 'date-fns'
import { Session } from 'next-auth'
import { unstable_cache as cache } from 'next/cache'

import { Categories } from '@/components/categories'
import { Icons } from '@/components/icons'
import { ListFormDialog } from '@/components/lists/list-form-dialog'
import { Lists } from '@/components/lists/lists'
import { TaskFormDialog } from '@/components/tasks/task-form-dialog'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

async function getLists(userId: string) {
  const lists = await db.list.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          tasks: {
            where: {
              done: false
            }
          }
        }
      }
    }
  })

  return lists.map(list => ({
    ...list,
    _count: undefined,
    tasksCount: list._count.tasks
  }))
}

async function getTasksCountFromBaseList(userId: string) {
  return db.task.count({
    where: {
      userId,
      done: false,
      listId: null
    }
  })
}

async function getTasksCount(userId: string) {
  const all = await db.task.count({
    where: {
      userId,
      done: false
    }
  })

  const today = await db.task.count({
    where: {
      userId,
      done: false,
      date: {
        gte: startOfToday(),
        lte: endOfToday()
      }
    }
  })

  const upcoming = await db.task.count({
    where: {
      userId,
      done: false,
      date: {
        gte: startOfTomorrow()
      }
    }
  })

  const done = await db.task.count({
    where: {
      userId,
      done: true
    }
  })

  return { all, today, upcoming, done }
}

const getCachedLists = cache(async userId => getLists(userId), ['lists'], {
  tags: ['lists'],
  revalidate: 3600
})

const getCachedTasksCountFromBaseList = cache(
  async userId => getTasksCountFromBaseList(userId),
  ['tasksCountFromBaseList'],
  {
    tags: ['baseList'],
    revalidate: 3600
  }
)

const getCachedTasksCount = cache(
  async userId => getTasksCount(userId),
  ['tasksCount'],
  {
    tags: ['tasks'],
    revalidate: 3600
  }
)

export default async function Page() {
  const session = (await auth()) as Session

  const lists = await getCachedLists(session.user.id)

  const taskCountFromBaseList = await getCachedTasksCountFromBaseList(
    session.user.id
  )

  const tasksCount = await getCachedTasksCount(session.user.id)

  return (
    <>
      <div className='pb-20 pt-6'>
        <Categories tasksCount={tasksCount} />

        <div className='mb-4 mt-8 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>My lists</h2>

          <ListFormDialog type='create'>
            <Button
              variant='none'
              size='none'
              className='gap-x-1.5 text-primary'
            >
              <Icons.plusCircle className='size-5 sm:size-4' />
              <span className='hidden sm:block'>Create a new list</span>
            </Button>
          </ListFormDialog>
        </div>

        <Lists lists={lists} taskCountFromBaseList={taskCountFromBaseList} />
      </div>

      <div className='fixed inset-x-0 bottom-1'>
        <div className='container flex justify-end'>
          <TaskFormDialog type='create'>
            <Button
              size='none'
              className='size-9 gap-x-1 px-0 sm:w-auto sm:px-3'
            >
              <Icons.plus className='size-5 sm:size-4' />
              <span className='hidden sm:block'>Add task</span>
            </Button>
          </TaskFormDialog>
        </div>
      </div>
    </>
  )
}
