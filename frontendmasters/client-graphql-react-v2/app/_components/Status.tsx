'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import StatusRing from './StatusRing'
import { useMutation } from '@urql/next'
import { UpdateIssueStatusMutation } from '@/gql/updateIssueMutation'

const Status = ({ status, issueId }: { status: string; issueId: string }) => {
  const [{ error, data, fetching }, updateStatusMutation] = useMutation(
    UpdateIssueStatusMutation
  )

  const onAction = async (newStatus: string) => {
    await updateStatusMutation({
      input: {
        id: issueId,
        status: newStatus,
      },
    })
  }

  if (error) {
    console.log(error)
  }

  return (
    <Dropdown
      classNames={{
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <button className="active:outline-none outline-none">
          <StatusRing status={status} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Statuses"
        className="p-3"
        selectionMode="single"
        selectedKeys={[status]}
        onAction={onAction as any}
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        <DropdownItem
          key="BACKLOG"
          startContent={<StatusRing status={'BACKLOG'} />}
        >
          <span>Backlog</span>
        </DropdownItem>
        <DropdownItem
          key="INPROGRESS"
          startContent={<StatusRing status={'INPROGRESS'} />}
        >
          <span>In Progress</span>
        </DropdownItem>
        <DropdownItem key="DONE" startContent={<StatusRing status={'DONE'} />}>
          <span>Done</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Status
