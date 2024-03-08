import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Details'
}

export default function Details() {
  return (
    <main className='flex h-screen flex-col items-center justify-center gap-y-4'>
      <h1 className='text-4xl font-bold'>Details</h1>

      <p className='text-muted-foreground'>Made by Natchi.</p>
    </main>
  )
}
