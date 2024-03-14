import { format } from 'date-fns'
import { redirect } from 'next/navigation'

import { SettingsForm } from '@/components/settings/settings-form'
import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

async function getDetails(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  const account = await db.account.findFirst({
    where: { userId }
  })

  return { user, account }
}

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.id) redirect('/login')

  const { user, account } = await getDetails(session.user.id)

  if (!account || !user) return null

  return (
    <div className='pt-4'>
      <h1 className='mb-2 text-3xl font-bold'>My account settings</h1>

      <div className='mb-4 flex flex-col gap-y-1 leading-none'>
        <p className='text-muted-foreground'>
          You are connected via{' '}
          <span className='font-medium capitalize'>{account.provider}</span>.
          The last update was on{' '}
          <span className='font-medium'>
            {format(user.updatedAt, 'MMMM d, yyyy')}
          </span>
        </p>
      </div>

      <SettingsForm user={user} />
    </div>
  )
}
