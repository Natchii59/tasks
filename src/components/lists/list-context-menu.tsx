'use client'

import { List } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'

import { Icons } from '../icons'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '../ui/context-menu'
import { DeleteListDialog } from './delete-list-dialog'
import { EditListDialog } from './edit-list-dialog'

type ListContextMenuProps = React.PropsWithChildren & {
  list: Pick<List, 'id' | 'name'> & { isDefault?: boolean }
}

export function ListContextMenu({ children, list }: ListContextMenuProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem className='gap-x-1.5' asChild>
            <Link href='/'>
              <Icons.eye className='size-4' />
              <span>View</span>
            </Link>
          </ContextMenuItem>

          {!list.isDefault && (
            <>
              <ContextMenuItem
                className='gap-x-1.5'
                onClick={() => setEditOpen(true)}
              >
                <Icons.pen className='size-4' />
                <span>Edit</span>
              </ContextMenuItem>

              <ContextMenuItem
                className='gap-x-1.5 text-destructive focus:text-destructive'
                onClick={() => setDeleteOpen(true)}
              >
                <Icons.trash className='size-4' />
                <span>Delete</span>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {!list.isDefault && (
        <>
          <EditListDialog
            list={list}
            open={editOpen}
            onOpenChange={setEditOpen}
          />

          <DeleteListDialog
            listId={list.id}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        </>
      )}
    </>
  )
}
