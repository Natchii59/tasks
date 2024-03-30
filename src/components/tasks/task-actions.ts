'use server'

import { Task } from '@prisma/client'
import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

type CreateTaskInput = Pick<Task, 'title'> &
  Partial<Pick<Task, 'description' | 'date' | 'listId'>>

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
  } catch (err) {
    let message = 'Failed to create task'
    if (err instanceof Error) {
      message = err.message
    }

    return { error: message }
  } finally {
    revalidateTag('tasks')

    if (input.listId) {
      revalidateTag(`lists`)
      revalidateTag(`list-${input.listId}`)
    } else {
      revalidateTag('baseList')
    }
  }
}

type UpdateTaskInput = Partial<
  Pick<Task, 'title' | 'description' | 'date' | 'listId' | 'done'>
>

export async function updateTask(id: string, input: UpdateTaskInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to update a task')
    }

    const task = await db.task.update({
      where: {
        id,
        userId: session.user.id
      },
      data: {
        title: input.title,
        description: input.description,
        date: input.date,
        done: input.done,
        listId: input.listId
      }
    })

    if (task.listId) {
      revalidateTag(`lists`)
      revalidateTag(`list-${input.listId}`)
    } else {
      revalidateTag('baseList')
    }
  } catch (err) {
    let message = 'Failed to update task'
    if (err instanceof Error) {
      message = err.message
    }

    return { error: message }
  } finally {
    revalidateTag('tasks')
  }
}

type DeleteTasksInput = {
  taskIds: string[]
}

export async function deleteTasks(input: DeleteTasksInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to delete a task')
    }

    await db.task.deleteMany({
      where: {
        id: {
          in: input.taskIds
        },
        userId: session.user.id
      }
    })
  } catch (err) {
    let message = 'Failed to delete tasks'
    if (err instanceof Error) {
      message = err.message
    }

    return { error: message }
  } finally {
    revalidateTag('tasks')
  }
}
