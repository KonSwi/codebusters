'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export type KanbanTicketStatus = 'todo' | 'inProgress' | 'done'
export type KanbanTicketResult = 'review' | 'positive' | 'negative'
export type KanbanTicketDifficulty = 'easy' | 'normal' | 'hard' | 'advanced'

export type KanbanTicket = {
  id: string
  title: string
  number: number
  difficulty: KanbanTicketDifficulty
  difficultyLabel: string
  technologyLabel: string
  typeLabel: string
  status: KanbanTicketStatus
  statusLabel: string
  result: KanbanTicketResult
  description?: string
  attachments?: string[]
}

type CardProps = {
  ticket: KanbanTicket
  statusLabel: string
  onClick: () => void
}

export const Card: React.FC<CardProps> = ({ ticket, statusLabel, onClick }) => {
  const t = useTranslations('signedIn.kanban.card')

  const difficultyClass = clsx({
    'border-green text-green':
      ticket.difficulty === 'easy' || ticket.difficulty === 'normal',
    'border-orange text-orange': ticket.difficulty === 'hard',
    'border-red text-red': ticket.difficulty === 'advanced',
  })

  return (
    <button
      type='button'
      onClick={onClick}
      className='bg-grayLightTask flex w-full flex-col gap-4 rounded-lg p-4 text-left shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
    >
      <header className='flex items-start justify-between gap-4'>
        <h3>{ticket.title}</h3>
        <div className='text-formErrorFont min-w-5.75 flex items-center justify-center rounded-lg border border-white px-2 py-1'>
          {ticket.number}
        </div>
      </header>
      <div className='h-0.5 w-full bg-white' />
      <div className='flex flex-wrap gap-2'>
        <span
          className={clsx(
            'text-formErrorFont rounded-lg border px-2 py-1',
            difficultyClass
          )}
        >
          {ticket.difficultyLabel}
        </span>
        <span className='border-blue text-blue text-formErrorFont rounded-lg border px-2 py-1'>
          {ticket.technologyLabel}
        </span>
        <span className='border-aqua text-aqua text-formErrorFont rounded-lg border px-2 py-1'>
          {ticket.typeLabel}
        </span>
      </div>
      <div className='h-0.5 w-full bg-white' />
      <p className='text-formErrorFont'>
        <span>{t('statusPrefix')}</span> {statusLabel}
      </p>
    </button>
  )
}
