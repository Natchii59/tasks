'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Task } from '@prisma/client'
import { format, subDays } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { neutralValuesToNull } from '@/lib/zod'

import { Icons } from '../icons'
import { RadioButton } from '../radio-button'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { createTask } from './task-actions'

const schema = z.object({
  title: z.string().min(1),
  description: neutralValuesToNull(z.string().nullable()),
  date: neutralValuesToNull(z.date().nullable())
})

type SchemaType = z.infer<typeof schema>

type CreateTaskFormProps = {
  addOptimisticTask: (task: Task) => void
  className?: string
  defaultDate?: Date
}

export function CreateTaskForm({
  addOptimisticTask,
  className,
  defaultDate
}: CreateTaskFormProps) {
  const session = useSession()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: null,
      date: defaultDate ?? null
    }
  })

  async function onSubmit(data: SchemaType) {
    if (!session.data) return

    const date = new Date()

    const newTask: Task = {
      id: date.getTime().toString(),
      title: data.title,
      description: data.description,
      date: data.date,
      done: false,
      createdAt: date,
      updatedAt: date,
      listId: null,
      userId: session.data.user.id
    }

    addOptimisticTask(newTask)
    form.reset()

    const result = await createTask(data)

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid w-full gap-y-1', className)}
      >
        <div className='flex items-center gap-x-2'>
          <RadioButton className='pointer-events-none border-dashed border-muted-foreground' />

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex-1 space-y-0'>
                <FormControl>
                  <input
                    placeholder='Add a task...'
                    className='h-6 w-full bg-transparent focus-visible:outline-none'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {form.getValues().title.length > 0 && (
          <>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='ml-6'>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder='Add a description...'
                      className='max-h-40 min-h-10 w-full resize-y bg-transparent text-sm text-muted-foreground focus-visible:outline-none'
                      value={field.value ?? ''}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='ml-6'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='secondary'
                          size='none'
                          className='h-6 gap-x-1 px-2 text-xs'
                        >
                          <Icons.calendar className='size-3' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={date => date < subDays(new Date(), 1)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              variant='secondary'
              size='sm'
              className='gap-x-1 justify-self-end'
            >
              <Icons.plus className='size-4' />
              <span>Add</span>
            </Button>
          </>
        )}
      </form>
    </Form>
  )
}
