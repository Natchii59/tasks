import { format } from 'date-fns'
import { Session } from 'next-auth'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { AccountBadge } from '@/components/settings/account-badge'
import { SettingsForm } from '@/components/settings/settings-form'
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
    <div className='pt-4'>
      <h1 className='mb-2 text-3xl font-bold'>My account settings</h1>

      <div className='mb-4 flex flex-col gap-y-1.5 leading-none text-muted-foreground'>
        <p>
          The last update was on{' '}
          <span className='font-medium'>
            {format(user.updatedAt, 'MMMM d, yyyy')}
          </span>
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
    </div>
  )
}
