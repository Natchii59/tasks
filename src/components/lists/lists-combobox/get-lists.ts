'use server'

import { Session } from 'next-auth'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

export async function getLists() {
  const session = (await auth()) as Session

  return db.list.findMany({
    where: { userId: session.user.id },
    orderBy: { name: 'asc' }
  })
}
