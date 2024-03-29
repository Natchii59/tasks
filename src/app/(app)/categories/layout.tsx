'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

type CategoriesLayoutProps = React.PropsWithChildren

export default function CategoriesLayout({ children }: CategoriesLayoutProps) {
  const pathname = usePathname()

  const category = useMemo(() => {
    return pathname.split('/').pop()
  }, [pathname])

  return (
    <div className='pt-4'>
      <h1 className='text-3xl font-extrabold capitalize'>{category}</h1>

      {children}
    </div>
  )
}
