'use server'

import { Task } from '@prisma/client'
import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

type CreateTaskInput = Pick<Task, 'title' | 'description' | 'listId' | 'date'>

export async function createTask(input: CreateTaskInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to create a list')
    }

    await db.task.create({
      data: {
        title: input.title,
        description: input.description,
        date: input.date,
        listId: input.listId,
        userId: session.user.id
      }
    })

    revalidateTag('tasks')

    if (input.listId) {
      revalidateTag(`lists`)
      revalidateTag(`list-${input.listId}`)
    } else {
      revalidateTag('tasksWithNoList')
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}
