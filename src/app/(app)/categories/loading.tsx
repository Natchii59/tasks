import { RadioButton } from '@/components/radio-button'
import { Separator } from '@/components/ui/separator'

export default function CategoriesLoading() {
  return (
    <div className='mt-4 grid gap-y-4'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='flex items-center gap-x-2 border-b pb-2'>
          <RadioButton className='pointer-events-none border-muted-foreground' />

          <Separator className='h-6 flex-1 rounded-md' />
        </div>
      ))}
    </div>
  )
}
