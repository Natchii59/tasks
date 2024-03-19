'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { createList } from './list-actions'

const schema = z.object({
  name: z.string().min(3, {
    message: 'List name must be at least 3 characters long'
  })
})

type SchemaType = z.infer<typeof schema>

type CreateListFormProps = {
  submitButton?:
    | React.ReactNode
    | (({}: { isLoading: boolean }) => React.ReactNode)
  submitButtonClassName?: string
  className?: string
  onSuccess?: () => void
}

export function CreateListForm({
  className,
  submitButton,
  submitButtonClassName,
  onSuccess
}: CreateListFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  })

  async function onSubmit(data: SchemaType) {
    setIsLoading(true)

    try {
      await createList(data)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='List name' />
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
