'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useMutation } from '@/hooks/use-mutation'
import { neutralValuesToNull } from '@/lib/zod'

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
import { updateUser } from './settings-actions'

type SettingsFormProps = {
  user: Pick<User, 'email' | 'name'>
}

const schema = z.object({
  email: neutralValuesToNull(
    z
      .string({
        invalid_type_error: 'Email must be a string'
      })
      .email({
        message: 'Email must be a valid email address'
      })
      .nullable()
  ),
  name: neutralValuesToNull(
    z
      .string({
        invalid_type_error: 'Name must be a string'
      })
      .min(3, {
        message: 'Name must be at least 3 characters long'
      })
      .nullable()
  )
})

type SchemaType = z.infer<typeof schema>

export function SettingsForm({ user }: SettingsFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user.email,
      name: user.name
    }
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      await updateUser(data)

      toast.success('Your account has been updated')
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(mutate)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='example@email.com'
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Your name'
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='gap-x-2' disabled={isLoading}>
          {isLoading && <Icons.spinner className='size-4 animate-spin' />}
          <span>Save changes</span>
        </Button>
      </form>
    </Form>
  )
}
