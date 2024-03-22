'use server'

import { List } from '@prisma/client'
import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

type CreateListInput = Pick<List, 'name'>

export async function createList(input: CreateListInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to create a list')
    }

    await db.list.create({
      data: {
        name: input.name,
        userId: session.user.id
      }
    })

    revalidateTag('lists')
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

type UpdateListInput = {
  id: string
  data: Partial<Pick<List, 'name'>>
}

export async function updateList({ id, data }: UpdateListInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to create a list')
    }

    await db.list.update({
      where: {
        id,
        userId: session.user.id
      },
      data
    })

    revalidateTag('lists')
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

type DeleteListInput = Pick<List, 'id'>

export async function deleteList(input: DeleteListInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to create a list')
    }

    await db.list.delete({
      where: {
        id: input.id,
        userId: session.user.id
      }
    })

    revalidateTag('lists')
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}
