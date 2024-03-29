import { Task } from '@prisma/client'
import { useOptimistic } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { RadioButton } from '../radio-button'
import { updateTask } from './task-actions'

type TaskOptimistic = Task & {
  loading?: boolean
}

type UpdatedTask = Pick<Task, 'done'>

type TaskItemProps = {
  task: TaskOptimistic
  className?: string
}

export function TaskItem({ task, className }: TaskItemProps) {
  const [optimisticTask, updateOptimisticTask] = useOptimistic<
    TaskOptimistic,
    UpdatedTask
  >(task, (state, updatedTask) => {
    return { ...state, ...updatedTask }
  })

  async function handleDoneTask() {
    updateOptimisticTask({ done: !task.done })
    const result = await updateTask(task.id, { done: !task.done })

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <div className={cn('flex flex-col gap-y-0.5', className)}>
      <form action={handleDoneTask} className='flex items-center gap-x-2'>
        <RadioButton
          selected={optimisticTask.done}
          type={optimisticTask.loading ? 'button' : 'submit'}
          className={cn(
            optimisticTask.loading &&
              'pointer-events-none animate-spin border-dashed border-muted-foreground duration-2000'
          )}
        />

        <p
          className={cn(
            'font-medium',
            optimisticTask.done && 'text-muted-foreground line-through'
          )}
        >
          {optimisticTask.title}
        </p>
      </form>

      {optimisticTask.description && (
        <p className='ml-6 text-sm text-muted-foreground'>
          {optimisticTask.description}
        </p>
      )}
    </div>
  )
}
