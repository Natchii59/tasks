import { Task } from '@prisma/client'
import { useOptimistic } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { RadioButton } from '../radio-button'
import { Button } from '../ui/button'
import { DeleteTasksDialog } from './delete-tasks-dialog'
import { updateTask } from './task-actions'

type TaskDoneItemProps = {
  task: Task
}

type TaskOptimistic = Pick<Task, 'done'>

export function TaskDoneItem({ task }: TaskDoneItemProps) {
  const [optimisticTask, updateOptimisticTask] = useOptimistic<
    Task,
    TaskOptimistic
  >(task, (state, updatedTask) => {
    return { ...state, ...updatedTask }
  })

  async function handleUndoneTask() {
    updateOptimisticTask({ done: false })
    const result = await updateTask(task.id, { done: false })

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <form
      action={handleUndoneTask}
      className='group flex h-8 items-center gap-x-2 rounded-md px-2 hover:bg-accent'
    >
      <RadioButton type='submit' selected={optimisticTask.done} />

      <p
        className={cn(
          'flex-1',
          optimisticTask.done && 'text-muted-foreground line-through'
        )}
      >
        {optimisticTask.title}
      </p>

      <DeleteTasksDialog taskIds={[task.id]}>
        <Button
          size='none'
          variant='none'
          className='hidden size-5 text-destructive hover:text-destructive group-hover:flex'
        >
          <Icons.trash className='size-4' />
        </Button>
      </DeleteTasksDialog>
    </form>
  )
}
