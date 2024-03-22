import { format } from 'date-fns'
import { Session } from 'next-auth'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { AccountBadge } from '@/components/settings/account-badge'
import { DeleteUserDialog } from '@/components/settings/delete-user-dialog'
import { SettingsForm } from '@/components/settings/settings-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

async function getDetails(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  const accounts = await db.account.findMany({
    where: { userId }
  })

  if (!user || !accounts) redirect('/login')

  return { user, accounts }
}

export default async function SettingsPage() {
  noStore()

  const session = (await auth()) as Session

  const { user, accounts } = await getDetails(session.user.id)

  return (
    <>
      <div className='mb-4 flex flex-col gap-y-1.5 leading-none text-muted-foreground'>
        <p>
          The last update was on <UpdatedAtTooltip date={user.updatedAt} />.
        </p>

        {accounts.length > 0 && (
          <div className='flex items-center gap-2'>
            <p>Your account is linked to:</p>

            <div className='flex items-center gap-1'>
              {accounts.map(account => (
                <AccountBadge key={account.id} account={account} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SettingsForm user={user} />

      <h2 className='mt-14 text-2xl font-bold'>Danger zone</h2>

      <Separator className='my-2' />

      <p className='mb-1.5 text-sm'>
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <DeleteUserDialog userId={session.user.id}>
        <Button variant='destructive' size='sm'>
          Delete account
        </Button>
      </DeleteUserDialog>
    </>
  )
}

type UpdatedAtTooltipProps = {
  date: Date
}

function UpdatedAtTooltip({ date }: UpdatedAtTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='cursor-default font-medium'>
            {format(date, 'MMMM d, yyyy')}
          </span>
        </TooltipTrigger>

        <TooltipContent>
          <p>{format(date, 'MMMM d, yyyy h:mm a')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
