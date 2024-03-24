import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='pt-6'>
      <div className='grid gap-2 sm:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-32' />
        ))}
      </div>

      <h2 className='mb-4 mt-8 text-2xl font-bold'>My lists</h2>

      <div className='grid gap-y-2'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-10' />
        ))}
      </div>
    </div>
  )
}
