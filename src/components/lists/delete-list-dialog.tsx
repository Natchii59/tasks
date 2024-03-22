'use client'

import { useState } from 'react'

import { useMutation } from '@/hooks/use-mutation'

import { Icons } from '../icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { deleteList } from './list-actions'

type DeleteListDialogProps = React.PropsWithChildren & {
  listId: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSuccess?: () => void
}

export function DeleteListDialog({
  children,
  listId,
  open,
  onOpenChange,
  onSuccess
}: DeleteListDialogProps) {
  const [baseOpen, setBaseOpen] = useState<boolean>(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      await deleteList({ id: listId })

      if (onOpenChange) {
        onOpenChange(false)
      } else {
        setBaseOpen(false)
      }

      if (onSuccess) {
        onSuccess()
      }
    }
  })

  function handleOpenChange(value: boolean) {
    if (!isLoading) {
      if (onOpenChange) {
        onOpenChange(value)
      } else {
        setBaseOpen(value)
      }
    }
  }

  return (
    <AlertDialog
      open={open !== undefined ? open : baseOpen}
      onOpenChange={handleOpenChange}
    >
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete list</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this list? This action cannot be
            undone. All tasks in this list will be moved to the Tasks list.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={mutate} disabled={isLoading}>
            {isLoading && <Icons.spinner className='size-4 animate-spin' />}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
