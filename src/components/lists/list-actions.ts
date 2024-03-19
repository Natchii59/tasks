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
  } catch (err: any) {
    throw new Error(err.message)
  }
}
