'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { useMutation } from '@/hooks/use-mutation'
import { cn } from '@/lib/utils'

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
import { buttonVariants } from '../ui/button'
import { deleteUser } from './settings-actions'

type DeleteUserDialogProps = React.PropsWithChildren & {
  userId: string
}

export function DeleteUserDialog({ children, userId }: DeleteUserDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      await deleteUser({ id: userId })

      setOpen(false)
      toast.success('Your account has been deleted')
    }
  })

  function handleSetOpen(value: boolean) {
    if (!isLoading) {
      setOpen(value)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleSetOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete your account? All your data will be lost.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={mutate}
            disabled={isLoading}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            {isLoading && <Icons.spinner className='size-4 animate-spin' />}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
