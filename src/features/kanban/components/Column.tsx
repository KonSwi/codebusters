'use client'

import React from 'react'
import { ReactSortable } from 'react-sortablejs'

import { Button } from '@/components'

import { Card, KanbanTicket } from './Card'

type ColumnProps = {
  title: string
  statusLabel: string
  tickets: KanbanTicket[]
  setTickets: (tickets: KanbanTicket[]) => void
  onTicketClick: (ticket: KanbanTicket) => void
}

export const Column: React.FC<ColumnProps> = ({
  title,
  statusLabel,
  tickets,
  setTickets,
  onTicketClick,
}) => {
  return (
    <section className='bg-codeBorder min-h-80 flex flex-1 flex-col overflow-hidden rounded-lg'>
      <header>
        <Button
          type='button'
          variant='orangeBlack'
          className='flex h-10 w-full shrink-0 items-center justify-center rounded-none px-4 py-2'
        >
          {title}
        </Button>
      </header>
      <div className='overflow-y-auto p-4'>
        <ReactSortable
          list={tickets}
          setList={setTickets}
          group='kanban-board'
          className='flex flex-1 flex-col gap-4 overflow-y-auto'
        >
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              ticket={ticket}
              statusLabel={statusLabel}
              onClick={() => onTicketClick(ticket)}
            />
          ))}
        </ReactSortable>
      </div>
    </section>
  )
}
