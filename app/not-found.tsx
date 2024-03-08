import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='flex h-screen flex-col items-center justify-center gap-y-4'>
      <h1 className='text-4xl font-bold'>Page not found</h1>

      <Button asChild>
        <Link href='/'>Back home</Link>
      </Button>
    </main>
  )
}
