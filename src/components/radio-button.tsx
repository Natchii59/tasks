import { Circle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export type RadioButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
}

const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, children, selected, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex aspect-square size-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {selected && <Circle className='size-3 fill-current text-current' />}
      </button>
    )
  }
)
RadioButton.displayName = 'Button'

export { RadioButton }
