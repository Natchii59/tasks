'use client'

import { List } from '@prisma/client'
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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer'
import { EditListForm } from './edit-list-form'

type EditListDialogProps = React.PropsWithChildren & {
  open: boolean
  onOpenChange: (open: boolean) => void
  list: Pick<List, 'id' | 'name'>
}

export function EditListDialog({
  children,
  open,
  onOpenChange,
  list
}: EditListDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function onSuccess() {
    onOpenChange(false)
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit list</DialogTitle>
            <DialogDescription>
              You currently editing the list &quot;
              <span className='font-semibold'>{list.name}</span>&quot;.
            </DialogDescription>
          </DialogHeader>

          <EditListForm
            list={list}
            onSuccess={onSuccess}
            submitButton={({ isLoading }) => (
              <DialogFooter className='mt-4'>
                <Button type='submit' className='gap-x-2' disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className='size-4 animate-spin' />
                  )}
                  <span>Update</span>
                </Button>
              </DialogFooter>
            )}
          />
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit list</DrawerTitle>
        </DrawerHeader>

        <EditListForm
          list={list}
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
