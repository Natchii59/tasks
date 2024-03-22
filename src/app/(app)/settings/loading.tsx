import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsLoading() {
  return (
    <>
      <Skeleton className='mb-1.5 h-4 w-1/3' />
      <Skeleton className='mb-4 h-5 w-1/3' />

      <Skeleton className='mb-4 h-10 w-full' />
      <Skeleton className='mb-4 h-10 w-full' />

      <Skeleton className='mb-4 h-10 w-32' />
    </>
  )
}
