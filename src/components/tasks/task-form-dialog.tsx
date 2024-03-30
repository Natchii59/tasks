'use client'

import { Task } from '@prisma/client'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer'
import { TaskForm } from './task-form'

type BaseProps = {
  children: React.ReactNode
}

type CreateTaskFormProps = {
  type: 'create'
}

type EditTaskFormProps = {
  type: 'edit'
  task: Task
}

type TaskFormDialogProps = BaseProps & (CreateTaskFormProps | EditTaskFormProps)

export function TaskFormDialog({ children, ...props }: TaskFormDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  function onSuccess() {
    setOpen(false)
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {props.type === 'create' ? 'Create a new task' : 'Edit task'}
            </DialogTitle>
            <DialogDescription>
              {props.type === 'create' ? (
                <>
                  A task is a single unit of work. You can add tasks to a list,
                  remove tasks from a list, and mark tasks as completed.
                </>
              ) : (
                <>
                  You currently editing the task &quot;
                  <span className='font-semibold'>{props.task.title}</span>
                  &quot;.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <TaskForm
            {...(props.type === 'create'
              ? { type: 'create' }
              : { type: 'edit', task: props.task })}
            onSuccess={onSuccess}
            submitButton={({ isLoading }) => (
              <DialogFooter>
                <Button type='submit' className='gap-x-2' disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className='size-4 animate-spin' />
                  )}
                  <span>{props.type === 'create' ? 'Submit' : 'Update'}</span>
                </Button>
              </DialogFooter>
            )}
          />
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {props.type === 'create' ? 'Create a new task' : 'Edit task'}
          </DrawerTitle>
          <DrawerDescription>
            {props.type === 'create' ? (
              <>
                A task is a single unit of work. You can add tasks to a list,
                remove tasks from a list, and mark tasks as completed.
              </>
            ) : (
              <>
                You currently editing the task &quot;
                <span className='font-semibold'>{props.task.title}</span>
                &quot;.
              </>
            )}
          </DrawerDescription>
        </DrawerHeader>

        <TaskForm
          {...(props.type === 'create'
            ? { type: 'create' }
            : { type: 'edit', task: props.task })}
          className='px-4'
          submitButtonClassName='mt-2 w-full'
          onSuccess={onSuccess}
        />

        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
