'use server'

import { Prisma, User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/prisma'

type UpdateUserInput = Pick<User, 'id' | 'email' | 'name'>

export async function updateUser(input: UpdateUserInput) {
  try {
    await db.user.update({
      where: { id: input.id },
      data: {
        email: input.email,
        name: input.name
      }
    })

    revalidatePath('/settings')
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const target = err.meta?.target as any
      if (target && target.includes('email')) {
        throw new Error('This email is already in use')
      }

      throw new Error(err.message)
    }
  }
}
