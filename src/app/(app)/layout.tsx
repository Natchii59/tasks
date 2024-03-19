import { redirect, RedirectType } from 'next/navigation'

import { Appbar } from '@/components/appbar/appbar'
import { auth } from '@/lib/auth'

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await auth()

  if (!session) redirect('/login', RedirectType.replace)

  return (
    <main className='relative h-screen bg-dot-black/[0.15] dark:bg-dot-white/[0.15]'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

      <div className='container relative z-20'>
        <Appbar user={session.user} />

        {children}
      </div>
    </main>
  )
}
