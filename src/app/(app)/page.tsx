import { startOfToday, startOfTomorrow } from 'date-fns'
import { Session } from 'next-auth'
import { unstable_cache as cache } from 'next/cache'

import { Categories } from '@/components/categories'
import { Icons } from '@/components/icons'
import { CreateListDialog } from '@/components/lists/create-list-dialog'
import { Lists } from '@/components/lists/lists'
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog'
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

async function getTasksWithNoListCount(userId: string) {
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
      date: startOfToday()
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

const getCachedTasksWithNoListCount = cache(
  async userId => getTasksWithNoListCount(userId),
  ['tasksWithNoList'],
  {
    tags: ['tasks'],
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

  const tasksWithNoList = await getCachedTasksWithNoListCount(session.user.id)

  const tasksCount = await getCachedTasksCount(session.user.id)

  return (
    <>
      <div className='pb-20 pt-6'>
        <Categories tasksCount={tasksCount} />

        <div className='mb-4 mt-8 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>My lists</h2>

          <CreateListDialog>
            <Button
              variant='none'
              size='none'
              className='gap-x-1.5 text-primary'
            >
              <Icons.plusCircle className='size-5 sm:size-4' />
              <span className='hidden sm:block'>Create a new list</span>
            </Button>
          </CreateListDialog>
        </div>

        <Lists lists={lists} tasksWithNoList={tasksWithNoList} />
      </div>

      <div className='fixed inset-x-0 bottom-1'>
        <div className='container flex justify-end'>
          <CreateTaskDialog lists={lists}>
            <Button
              size='none'
              className='size-9 gap-x-1 px-0 sm:w-auto sm:px-3'
            >
              <Icons.plus className='size-5 sm:size-4' />
              <span className='hidden sm:block'>Add task</span>
            </Button>
          </CreateTaskDialog>
        </div>
      </div>
    </>
  )
}
