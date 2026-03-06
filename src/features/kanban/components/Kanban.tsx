'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Column } from './Column'
import type { KanbanTicket } from './Card'
import { FullKanbanCard } from './FullKanbanCard'

type KanbanProps = {
  activityIds: string[]
}

type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD'

type Activity = {
  id: string
  source: 'JS' | 'CSS'
  title: string
  description: string
  difficultyLevel: DifficultyLevel
  hasSolution: boolean
  isSolved: boolean
}

type TranslateFn = (key: string) => string

const mapDifficulty = (
  difficultyLevel: DifficultyLevel,
  t: TranslateFn
): { difficulty: KanbanTicket['difficulty']; label: string } => {
  if (difficultyLevel === 'EASY') {
    return { difficulty: 'easy', label: t('difficulty.easy') }
  }

  if (difficultyLevel === 'HARD') {
    return { difficulty: 'hard', label: t('difficulty.hard') }
  }

  return { difficulty: 'normal', label: t('difficulty.normal') }
}

const mapStatus = (
  activity: Activity,
  t: TranslateFn
): { status: KanbanTicket['status']; label: string } => {
  if (!activity.hasSolution) {
    return { status: 'todo', label: t('status.todo') }
  }

  if (activity.isSolved) {
    return { status: 'done', label: t('status.done') }
  }

  return { status: 'inProgress', label: t('status.inProgress') }
}

const mapActivityToTicket = (
  activity: Activity,
  index: number,
  t: TranslateFn
): KanbanTicket => {
  const { difficulty, label: difficultyLabel } = mapDifficulty(
    activity.difficultyLevel,
    t
  )
  const { status, label: statusLabel } = mapStatus(activity, t)

  const technologyLabel = activity.source === 'JS' ? 'JS' : 'CSS'
  const result: KanbanTicket['result'] = !activity.hasSolution
    ? 'review'
    : activity.isSolved
    ? 'positive'
    : 'negative'

  return {
    id: activity.id,
    title: activity.title,
    number: index,
    difficulty,
    difficultyLabel,
    technologyLabel,
    typeLabel: t('type.exercise'),
    status,
    statusLabel,
    result,
    description: activity.description,
    attachments: [],
  }
}

export const Kanban: React.FC<KanbanProps> = ({ activityIds }) => {
  const t = useTranslations('signedIn.kanban')

  const [todoTickets, setTodoTickets] = React.useState<KanbanTicket[]>([])
  const [inProgressTickets, setInProgressTickets] = React.useState<
    KanbanTicket[]
  >([])
  const [doneTickets, setDoneTickets] = React.useState<KanbanTicket[]>([])

  const [selectedTicket, setSelectedTicket] =
    React.useState<KanbanTicket | null>(null)

  React.useEffect(() => {
    if (!activityIds.length) {
      setTodoTickets([])
      setInProgressTickets([])
      setDoneTickets([])
      return
    }

    const fetchActivities = async () => {
      try {
        const params = new URLSearchParams()
        params.set('ids', activityIds.join(','))

        const response = await fetch(`/api/activities?${params.toString()}`)

        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }

        const activities = (await response.json()) as Activity[]

        const tickets = activities.map((activity, index) =>
          mapActivityToTicket(activity, index + 1, t)
        )

        const nextTodo: KanbanTicket[] = []
        const nextInProgress: KanbanTicket[] = []
        const nextDone: KanbanTicket[] = []

        tickets.forEach((ticket) => {
          if (ticket.status === 'todo') {
            nextTodo.push(ticket)
          } else if (ticket.status === 'inProgress') {
            nextInProgress.push(ticket)
          } else if (ticket.status === 'done') {
            nextDone.push(ticket)
          }
        })

        setTodoTickets(nextTodo)
        setInProgressTickets(nextInProgress)
        setDoneTickets(nextDone)
      } catch (error) {
        console.error('Failed to load activities for Kanban', error)
        setTodoTickets([])
        setInProgressTickets([])
        setDoneTickets([])
      }
    }

    void fetchActivities()
  }, [activityIds, t])

  const handleTicketClick = (ticket: KanbanTicket) => {
    setSelectedTicket(ticket)
  }

  const handleCloseModal = () => {
    setSelectedTicket(null)
  }

  return (
    <>
      <div className='bg-gray flex h-full flex-col rounded-b-lg px-4 py-8'>
        <div className='flex flex-1 gap-4 overflow-y-auto'>
          <Column
            title={t('columns.todo')}
            statusLabel={t('status.todo')}
            tickets={todoTickets}
            setTickets={setTodoTickets}
            onTicketClick={handleTicketClick}
          />
          <Column
            title={t('columns.inProgress')}
            statusLabel={t('status.inProgress')}
            tickets={inProgressTickets}
            setTickets={setInProgressTickets}
            onTicketClick={handleTicketClick}
          />
          <Column
            title={t('columns.done')}
            statusLabel={t('status.done')}
            tickets={doneTickets}
            setTickets={setDoneTickets}
            onTicketClick={handleTicketClick}
          />
        </div>
      </div>
      {selectedTicket ? (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-[5px]'
          onClick={handleCloseModal}
        >
          <div className='w-175' onClick={(event) => event.stopPropagation()}>
            <FullKanbanCard ticket={selectedTicket} />
          </div>
        </div>
      ) : null}
    </>
  )
}
