'use client'

import { List } from '@prisma/client'
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
import { CreateTaskFormDialog } from './create-task-form-dialog'

type CreateTaskProps = React.PropsWithChildren & {
  lists: Pick<List, 'id' | 'name'>[]
}

export function CreateTaskDialog({ children, lists }: CreateTaskProps) {
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
            <DialogTitle>Create a new task</DialogTitle>
            <DialogDescription>
              A task is a single unit of work. You can add tasks to a list,
              remove tasks from a list, and mark tasks as completed.
            </DialogDescription>
          </DialogHeader>

          <CreateTaskFormDialog
            lists={lists}
            onSuccess={onSuccess}
            submitButton={({ isLoading }) => (
              <DialogFooter>
                <Button type='submit' className='gap-x-2' disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className='size-4 animate-spin' />
                  )}
                  <span>Submit</span>
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
          <DrawerTitle>Create a new task</DrawerTitle>
          <DrawerDescription>
            A task is a single unit of work. You can add tasks to a list, remove
            tasks from a list, and mark tasks as completed.
          </DrawerDescription>
        </DrawerHeader>

        <CreateTaskFormDialog
          lists={lists}
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
