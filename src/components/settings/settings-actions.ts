'use server'

import { Account, Prisma, User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

type UpdateUserInput = Pick<User, 'email' | 'name'>

export async function updateUser(input: UpdateUserInput) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error('You must be logged in to update your profile')
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        email: input.email,
        name: input.name
      }
    })

    revalidatePath('/settings')
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const target = err.meta?.target as any
      if (target && target.includes('email')) {
        throw new Error('This email is already in use')
      }
    }

    throw new Error(err.message)
  }
}

type DeleteAccountInput = Pick<Account, 'id'>

export async function deleteAccount({ id }: DeleteAccountInput) {
  try {
    await db.account.delete({
      where: { id }
    })

    revalidatePath('/settings')
  } catch (err: any) {
    throw new Error(err.message)
  }
}
