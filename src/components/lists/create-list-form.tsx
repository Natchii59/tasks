'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMutation } from '@/hooks/use-mutation'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { createList } from './list-actions'

const schema = z.object({
  name: z.string().min(3, {
    message: 'List name must be at least 3 characters long'
  })
})

type SchemaType = z.infer<typeof schema>

type CreateListFormProps = {
  className?: string
  submitButtonClassName?: string
  submitButton?:
    | React.ReactNode
    | (({}: { isLoading: boolean }) => React.ReactNode)
  onSuccess?: () => void
}

export function CreateListForm({
  className,
  submitButtonClassName,
  submitButton,
  onSuccess
}: CreateListFormProps) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      await createList(data)

      if (onSuccess) {
        onSuccess()
      }
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(mutate)} className={cn(className)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='My new list' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitButton ? (
          typeof submitButton === 'function' ? (
            submitButton({ isLoading })
          ) : (
            submitButton
          )
        ) : (
          <Button
            type='submit'
            className={cn(submitButtonClassName, 'gap-x-2')}
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner className='size-4 animate-spin' />}
            <span>Submit</span>
          </Button>
        )}
      </form>
    </Form>
  )
}
