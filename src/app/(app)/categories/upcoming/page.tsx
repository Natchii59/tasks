import { startOfTomorrow } from 'date-fns'
import { Session } from 'next-auth'
import { unstable_cache as cache } from 'next/cache'

import { TasksDoneList } from '@/components/tasks/tasks-done-list'
import { TasksList } from '@/components/tasks/tasks-list'
import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

async function getTasks() {
  const session = (await auth()) as Session

  const tasks = await db.task.findMany({
    where: {
      date: {
        gte: startOfTomorrow()
      },
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

const getCachedTasks = cache(async () => getTasks(), ['upcomingTasks'], {
  tags: ['tasks'],
  revalidate: 3600
})

export default async function CategoryUpcomingPage() {
  const tasks = await getCachedTasks()

  const tasksUndone = tasks.filter(task => !task.done)

  const tasksDone = tasks.filter(task => task.done)

  return (
    <>
      <TasksDoneList tasks={tasksDone} />

      <TasksList tasks={tasksUndone} type='upcoming' className='mt-5' />
    </>
  )
}
