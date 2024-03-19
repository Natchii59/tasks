'use client'

import { Account } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'

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
import { Badge } from '../ui/badge'
import { deleteAccount } from './settings-actions'

type AccountBadgeProps = {
  account: Pick<Account, 'id' | 'provider'>
}

export function AccountBadge({ account }: AccountBadgeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const ProviderIcon =
    Icons[account.provider.toLowerCase() as 'google' | 'github']

  async function onConfirm() {
    setIsLoading(true)

    try {
      await deleteAccount({ id: account.id })
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Badge variant='secondary' className='group cursor-default capitalize'>
          <ProviderIcon className='mr-1 size-3' />
          <span>{account.provider}</span>
          <Icons.x className='ml-1.5 hidden size-3 group-hover:block' />
        </Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unlink account</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to unlink your{' '}
            <span className='font-semibold'>{account.provider}</span> account.
            This will prevent you from logging in with this account in the
            future.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Icons.spinner className='size-4 animate-spin' />}
            <span>Unlink</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
