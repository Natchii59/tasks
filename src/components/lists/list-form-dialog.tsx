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
import { ListForm } from './list-form'

type BaseProps = React.PropsWithChildren & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type CreateListFormDialogProps = {
  type: 'create'
}

type EditListFormDialogProps = {
  type: 'edit'
  list: List
}

type ListFormDialogProps = BaseProps &
  (CreateListFormDialogProps | EditListFormDialogProps)

export function ListFormDialog({
  children,
  open,
  onOpenChange,
  ...props
}: ListFormDialogProps) {
  const [baseOpen, setBaseOpen] = useState<boolean>(false)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  function onSuccess() {
    if (onOpenChange) {
      onOpenChange(false)
    } else {
      setBaseOpen(false)
    }
  }

  function handleOpenChange(value: boolean) {
    if (onOpenChange) {
      onOpenChange(value)
    } else {
      setBaseOpen(value)
    }
  }

  if (isDesktop)
    return (
      <Dialog
        open={open !== undefined ? open : baseOpen}
        onOpenChange={handleOpenChange}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {props.type === 'create' ? 'Create a new list' : 'Edit list'}
            </DialogTitle>
            <DialogDescription>
              {props.type === 'create' ? (
                <>
                  A list is a collection of tasks. You can add tasks to a list,
                  remove tasks from a list, and mark tasks as completed.
                </>
              ) : (
                <>
                  You currently editing the list &quot;
                  <span className='font-semibold'>{props.list.name}</span>
                  &quot;.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <ListForm
            {...(props.type === 'create'
              ? { type: 'create' }
              : { type: 'edit', list: props.list })}
            onSuccess={onSuccess}
            submitButton={({ isLoading }) => (
              <DialogFooter className='mt-4'>
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
    <Drawer
      open={open !== undefined ? open : baseOpen}
      onOpenChange={handleOpenChange}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {props.type === 'create' ? 'Create a new list' : 'Edit list'}
          </DrawerTitle>
          <DrawerDescription>
            {props.type === 'create' ? (
              <>
                A list is a collection of tasks. You can add tasks to a list,
                remove tasks from a list, and mark tasks as completed.
              </>
            ) : (
              <>
                You currently editing the list &quot;
                <span className='font-semibold'>{props.list.name}</span>
                &quot;.
              </>
            )}
          </DrawerDescription>
        </DrawerHeader>

        <ListForm
          {...(props.type === 'create'
            ? { type: 'create' }
            : { type: 'edit', list: props.list })}
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
