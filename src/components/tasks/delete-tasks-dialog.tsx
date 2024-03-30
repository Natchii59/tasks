import { useState } from 'react'
import { toast } from 'sonner'

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
import { deleteTasks } from './task-actions'

type DeleteTasksDialogProps = React.PropsWithChildren<{
  taskIds: string[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSuccess?: () => void
}>

export function DeleteTasksDialog({
  children,
  open,
  onOpenChange,
  onSuccess,
  taskIds
}: DeleteTasksDialogProps) {
  const [baseOpen, setBaseOpen] = useState<boolean>(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      const result = await deleteTasks({ taskIds })

      if (result?.error) {
        toast.error(result.error)
        return
      }

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
          <AlertDialogTitle>
            Delete task{taskIds.length > 1 && 's'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this task
            {taskIds.length > 1 && 's'}? This action cannot be undone.
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
