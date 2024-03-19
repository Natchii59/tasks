'use client'

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
import { CreateListForm } from './create-list-form'

type CreateListProps = React.PropsWithChildren

export function CreateList({ children }: CreateListProps) {
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
            <DialogTitle>Create a new list</DialogTitle>
            <DialogDescription>
              A list is a collection of tasks. You can add tasks to a list,
              remove tasks from a list, and mark tasks as completed.
            </DialogDescription>
          </DialogHeader>

          <CreateListForm
            onSuccess={onSuccess}
            submitButton={({ isLoading }) => (
              <DialogFooter className='mt-4'>
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
          <DrawerTitle>Create a new list</DrawerTitle>
          <DrawerDescription>
            A list is a collection of tasks. You can add tasks to a list, remove
            tasks from a list, and mark tasks as completed.
          </DrawerDescription>
        </DrawerHeader>

        <CreateListForm
          className='px-4'
          submitButtonClassName='mt-4 w-full'
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
