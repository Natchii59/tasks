'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

const schema = z.object({
  email: z
    .string()
    .email({
      message: 'Email is invalid'
    })
    .optional()
})

export function LoginForm() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: ''
    },
    reValidateMode: 'onChange'
  })

  const callbackUrl = useMemo(() => {
    return searchParams.get('callbackUrl') ?? '/'
  }, [searchParams])

  async function onSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true)

    await signIn('nodemailer', {
      email: data.email,
      callbackUrl: '/auth/verified-email'
    })

    setIsLoading(false)
  }

  return (
    <div className='grid w-full gap-y-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid w-full gap-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='example@email.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full gap-x-2' disabled={isLoading}>
            {isLoading && <Icons.spinner className='size-4 animate-spin' />}
            <span>Sign in with email</span>
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='absolute' />
        </div>

        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type='button'
        variant='outline'
        className='gap-x-2'
        onClick={() => signIn('github', { callbackUrl })}
      >
        <Icons.github className='size-4' />
        <span>Github</span>
      </Button>
    </div>
  )
}
