import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main className='flex h-screen flex-col items-center justify-center gap-y-6'>
      <h1 className='text-4xl font-bold'>Next.js Starter</h1>

      <div className='grid gap-y-1'>
        <Button asChild>
          <Link href='/details'>Go to details</Link>
        </Button>

        <Button variant='outline' asChild>
          <Link href='/github'>Github</Link>
        </Button>
      </div>
    </main>
  )
}
