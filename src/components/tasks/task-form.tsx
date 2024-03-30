'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Task } from '@prisma/client'
import { format, startOfDay, subDays } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMutation } from '@/hooks/use-mutation'
import { cn } from '@/lib/utils'
import { neutralValuesToNull } from '@/lib/zod'

import { Icons } from '../icons'
import { ListsCombobox } from '../lists/lists-combobox/lists-combobox'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Textarea } from '../ui/textarea'
import { createTask, updateTask } from './task-actions'

const schema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be a string'
    })
    .min(1, {
      message: 'Title is required'
    }),
  description: neutralValuesToNull(
    z
      .string({
        invalid_type_error: 'Description must be a string'
      })
      .nullable()
  ),
  listId: neutralValuesToNull(z.string().nullable()),
  date: z.date().optional()
})

type SchemaType = z.infer<typeof schema>

type BaseProps = {
  submitButton?:
    | React.ReactNode
    | ((props: { isLoading: boolean }) => React.ReactNode)
  submitButtonClassName?: string
  className?: string
  onSuccess?: () => void
}

type CreateTaskFormProps = {
  type: 'create'
}

type EditTaskFormProps = {
  type: 'edit'
  task: Task
}

type TaskFormProps = BaseProps & (CreateTaskFormProps | EditTaskFormProps)

export function TaskForm({
  className,
  submitButton,
  submitButtonClassName,
  onSuccess,
  ...props
}: TaskFormProps) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: props.type === 'edit' ? props.task.title : '',
      description: props.type === 'edit' ? props.task.description : null,
      date:
        props.type === 'edit' && props.task.date
          ? new Date(props.task.date)
          : undefined,
      listId: props.type === 'edit' ? props.task.listId : null
    }
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      if (props.type === 'create') {
        await createTask(data)
      } else {
        await updateTask(props.task.id, data)
      }

      if (onSuccess) {
        onSuccess()
      }
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(mutate)}
        className={cn('grid gap-y-3', className)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Buy groceries' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Buy milk, eggs, and bread.'
                  className='max-h-60 resize-y'
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='listId'
          render={({ field }) => (
            <FormItem className='overflow-hidden'>
              <FormLabel>List</FormLabel>
              <ListsCombobox
                selectedListId={field.value}
                setSelectedListId={field.onChange}
                formControl
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-full justify-between gap-x-1 font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icons.calendar className='size-4 text-muted-foreground' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value ?? undefined}
                    onSelect={date => {
                      field.onChange(date ? startOfDay(date) : undefined)
                    }}
                    disabled={date => date < subDays(new Date(), 1)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

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
            className={cn('gap-x-2', submitButtonClassName)}
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner className='size-4 animate-spin' />}
            <span>{props.type === 'create' ? 'Submit' : 'Update'}</span>
          </Button>
        )}
      </form>
    </Form>
  )
}
