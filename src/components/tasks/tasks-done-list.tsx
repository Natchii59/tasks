'use client'

import { Task } from '@prisma/client'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { Accordion, AccordionContent, AccordionItem } from '../ui/accordion'
import { Button } from '../ui/button'
import { DeleteTasksDialog } from './delete-tasks-dialog'
import { TaskDoneItem } from './task-done-item'

type TasksDoneProps = {
  tasks: Task[]
  className?: string
}

export function TasksDoneList({ tasks, className }: TasksDoneProps) {
  const [value, setValue] = useState<string>('')

  function toggleValue() {
    setValue(prev => (prev === 'tasks' ? '' : 'tasks'))
  }

  useEffect(() => {
    if (!tasks.length && value === 'tasks') {
      setValue('')
    }
  }, [tasks, value])

  return (
    <Accordion
      type='single'
      collapsible
      className={cn('w-full', className)}
      value={tasks.length ? value : ''}
      onValueChange={setValue}
    >
      <AccordionItem value='tasks'>
        <div className='flex items-center justify-between py-2 text-sm'>
          <div className='flex items-center gap-x-2 leading-none text-muted-foreground'>
            <p>
              {tasks.length} task{tasks.length > 1 ? 's' : ''} done
            </p>

            {tasks.length > 0 && (
              <>
                <Icons.circle className='size-1.5 fill-current' />

                <DeleteTasksDialog taskIds={tasks.map(task => task.id)}>
                  <Button
                    variant='none'
                    size='none'
                    className='leading-none hover:text-destructive'
                  >
                    Delete task{tasks.length > 1 ? 's' : ''}
                  </Button>
                </DeleteTasksDialog>
              </>
            )}
          </div>

          <Button
            variant='text'
            size='none'
            className='text-primary'
            onClick={toggleValue}
            disabled={!tasks.length}
          >
            Show
          </Button>
        </div>

        <AccordionContent>
          <div className='grid gap-y-0.5'>
            {tasks.map(task => (
              <TaskDoneItem key={task.id} task={task} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
