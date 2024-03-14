'use client'

import { User } from 'next-auth'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

type UserAvatarProps = Pick<User, 'image' | 'name'> & {
  className?: string
}

export function UserAvatar({ image, name, className }: UserAvatarProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        src={image ?? ''}
        alt='Avatar'
        onLoadingStatusChange={status => setIsLoading(status === 'loading')}
      />

      {isLoading ? (
        <Skeleton className='size-full' />
      ) : (
        <AvatarFallback className='uppercase'>
          {name ? (
            <span className='text-lg font-semibold uppercase'>{name[0]}</span>
          ) : (
            <Icons.users className='size-4' />
          )}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
