import { Session } from 'next-auth'
import { unstable_cache as cache } from 'next/cache'

import { Categories } from '@/components/categories'
import { Icons } from '@/components/icons'
import { Lists } from '@/components/lists'
import { CreateList } from '@/components/lists/create-list'
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
          tasks: true
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
      listId: null
    }
  })
}

const getCachedLists = cache(async userId => getLists(userId), ['lists'], {
  tags: ['lists'],
  revalidate: 3600
})

const getCachedTasksWithNoListCount = cache(
  async userId => getTasksWithNoListCount(userId),
  ['tasksWithNoList'],
  {
    tags: ['tasks', 'tasksWithNoList'],
    revalidate: 3600
  }
)

export default async function Page() {
  const session = (await auth()) as Session

  const lists = await getCachedLists(session.user.id)

  const tasksWithNoList = await getCachedTasksWithNoListCount(session.user.id)

  return (
    <div className='mt-6'>
      <Categories />

      <div className='mb-4 mt-8 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>My lists</h2>

        <CreateList>
          <Button variant='none' size='none' className='gap-x-2 text-primary'>
            <Icons.plus className='size-5 sm:size-4' />
            <span className='hidden sm:block'>Create a new list</span>
          </Button>
        </CreateList>
      </div>

      <Lists lists={lists} tasksWithNoList={tasksWithNoList} />
    </div>
  )
}
