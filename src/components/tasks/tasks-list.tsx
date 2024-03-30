'use client'

import { List, Task } from '@prisma/client'
import { addDays, startOfToday } from 'date-fns'
import { useOptimistic } from 'react'

import { cn } from '@/lib/utils'

import { AddTaskForm } from './add-task-form'
import { TaskItem } from './task-item'

type TaskWithList = Task & {
  list: Pick<List, 'id' | 'name'> | null
}

type TasksListProps = {
  tasks: TaskWithList[]
  className?: string
  type: 'all' | 'today' | 'upcoming' | 'done' | 'list'
}

type TaskOptimistic = TaskWithList & {
  loading?: boolean
}

export function TasksList({ tasks, className, type }: TasksListProps) {
  const [optimisticTasks, addOptimisticTask] = useOptimistic<
    TaskOptimistic[],
    Task
  >(tasks, (state, newTask) => {
    return [...state, { ...newTask, loading: true, list: null }]
  })

  return (
    <div className={cn('grid gap-y-4', className)}>
      {!optimisticTasks.length && type === 'done' ? (
        <p className='text-muted-foreground'>
          You haven&apos;t completed any tasks yet.
        </p>
      ) : (
        optimisticTasks.map(task => (
          <TaskItem key={task.id} task={task} className='border-b pb-2' />
        ))
      )}

      {type !== 'done' && (
        <AddTaskForm
          addOptimisticTask={addOptimisticTask}
          className='border-b pb-2'
          defaultDate={
            type === 'today'
              ? startOfToday()
              : type === 'upcoming'
                ? addDays(startOfToday(), 1)
                : undefined
          }
        />
      )}
    </div>
  )
}
