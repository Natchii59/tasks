import { List, Task } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { Button, buttonVariants } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { DeleteTasksDialog } from './delete-tasks-dialog'
import { TaskFormDialog } from './task-form-dialog'

type TaskWithList = Task & {
  list: Pick<List, 'id' | 'name'> | null
}

type TaskInfoPopoverProps = {
  children: React.ReactNode
  task: TaskWithList
}

export function TaskInfoPopover({ children, task }: TaskInfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent align='end' className='p-2 text-sm' hideWhenDetached>
        <p className='mb-2 text-base font-semibold'>Informations</p>

        <div className='mb-3 grid grid-cols-2 gap-y-3'>
          {task.date && (
            <>
              <div className='flex items-center gap-x-1'>
                <Icons.calendarDays className='size-3.5' />
                <p>Date</p>
              </div>

              <p className='text-muted-foreground'>
                {format(task.date, 'PPP')}
              </p>
            </>
          )}

          {task.list && (
            <>
              <div className='flex items-center gap-x-1'>
                <Icons.list className='size-3.5' />
                <p>List</p>
              </div>

              <Link
                href='/'
                className={cn(
                  buttonVariants({ variant: 'link', size: 'none' }),
                  'justify-normal text-muted-foreground'
                )}
              >
                {task.list.name}
              </Link>
            </>
          )}
        </div>

        <div className='grid grid-cols-2 gap-y-0.5'>
          <p>Created at</p>
          <p className='text-muted-foreground'>
            {format(task.createdAt, 'PPP')}
          </p>

          <p>Updated at</p>
          <p className='text-muted-foreground'>
            {format(task.updatedAt, 'PPP')}
          </p>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-x-2'>
          <TaskFormDialog type='edit' task={task}>
            <Button variant='outline' size='sm' className='h-8 gap-x-2'>
              <Icons.pen className='size-3' />
              <span>Edit</span>
            </Button>
          </TaskFormDialog>

          <DeleteTasksDialog taskIds={[task.id]}>
            <Button variant='destructive' size='sm' className='h-8 gap-x-2'>
              <Icons.trash className='size-3' />
              <span>Delete</span>
            </Button>
          </DeleteTasksDialog>
        </div>
      </PopoverContent>
    </Popover>
  )
}
