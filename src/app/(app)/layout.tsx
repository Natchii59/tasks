import { redirect, RedirectType } from 'next/navigation'

import { Appbar } from '@/components/appbar/appbar'
import { auth } from '@/lib/auth'

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await auth()

  if (!session?.user) redirect('/login', RedirectType.replace)

  return (
    <main className='container'>
      <Appbar user={session.user} />

      {children}
    </main>
  )
}
