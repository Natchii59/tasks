import { List, Task } from '@prisma/client'
import { useOptimistic } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { RadioButton } from '../radio-button'
import { Button } from '../ui/button'
import { updateTask } from './task-actions'
import { TaskInfoPopover } from './task-info-popover'

type TaskWithList = Task & {
  list: Pick<List, 'id' | 'name'> | null
}

type TaskOptimistic = TaskWithList & {
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
      <form action={handleDoneTask} className='group flex items-center gap-x-2'>
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
            'flex-1 font-medium',
            optimisticTask.done && 'text-muted-foreground line-through'
          )}
        >
          {optimisticTask.title}
        </p>

        <TaskInfoPopover task={task}>
          <Button
            size='none'
            variant='none'
            className='hidden text-primary group-hover:flex data-[state=open]:flex'
          >
            <Icons.info className='size-4' />
          </Button>
        </TaskInfoPopover>
      </form>

      {optimisticTask.description && (
        <p className='ml-6 text-sm text-muted-foreground'>
          {optimisticTask.description}
        </p>
      )}
    </div>
  )
}
