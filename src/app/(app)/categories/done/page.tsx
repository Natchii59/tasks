import { Session } from 'next-auth'
import { unstable_cache as cache } from 'next/cache'

import { TasksList } from '@/components/tasks/tasks-list'
import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

async function getTasks() {
  const session = (await auth()) as Session

  const tasks = await db.task.findMany({
    where: {
      done: true,
      userId: session.user.id
    },
    orderBy: { createdAt: 'asc' },
    include: {
      list: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return tasks
}

const getCachedTasks = cache(async () => getTasks(), ['doneTasks'], {
  tags: ['tasks'],
  revalidate: 3600
})

export default async function CategoryDonePage() {
  const tasks = await getCachedTasks()

  return (
    <>
      <TasksList tasks={tasks} type='done' className='mt-4' />
    </>
  )
}
