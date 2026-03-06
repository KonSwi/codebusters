'use client'

import React from 'react'
import clsx from 'clsx'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'
import { PaperClipIcon } from '@/icons'

import type { KanbanTicket } from './Card'

type FullKanbanCardProps = {
  ticket: KanbanTicket
}

export const FullKanbanCard: React.FC<FullKanbanCardProps> = ({ ticket }) => {
  const [attachments, setAttachments] = React.useState<string[]>(
    () => ticket.attachments ?? []
  )
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

  const t = useTranslations('signedIn.kanban.fullCard')

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newNames = Array.from(files).map((file) => file.name)
    setAttachments((prev) => [...prev, ...newNames])
  }

  const handleAddAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveAttachment = (name: string) => {
    setAttachments((prev) => prev.filter((item) => item !== name))
  }

  const handleGoToTask = () => {
    if (!locale) return

    const tech = (ticket.technologyLabel || '').toLowerCase()
    const segment = tech === 'css' ? 'css-task' : 'task'

    router.push(`/${locale}/${segment}/${ticket.id}`)
  }

  return (
    <div className='bg-gray flex w-full flex-col gap-4 rounded-lg p-8'>
      <header className='flex flex-wrap items-center justify-between gap-4'>
        <h2 className='text-titleSmallFont'>{ticket.title}</h2>
        <p>
          <span>{t('statusPrefix')}&nbsp;</span>
          {ticket.statusLabel}
        </p>
      </header>
      <div className='h-0.5 w-full bg-white' />
      <section className='flex flex-wrap justify-between gap-4'>
        <div className='flex gap-4'>
          <span
            className={clsx('rounded-lg border px-3 py-1', {
              'border-green text-green':
                ticket.difficulty === 'easy' || ticket.difficulty === 'normal',
              'border-orange text-orange': ticket.difficulty === 'hard',
              'border-red text-red': ticket.difficulty === 'advanced',
            })}
          >
            {ticket.difficultyLabel}
          </span>
          <span className='border-blue text-blue rounded-lg border px-3 py-1'>
            {ticket.technologyLabel}
          </span>
          <span className='border-aqua text-aqua rounded-lg border px-3 py-1'>
            {ticket.typeLabel}
          </span>
        </div>
        <div className='min-w-5.75 flex items-center justify-center rounded-lg border px-2 py-1'>
          {ticket.number}
        </div>
      </section>
      <div className='h-0.5 w-full bg-white' />
      <section className='flex items-center justify-between'>
        <Button
          type='button'
          variant='transparent'
          disabled
          className='w-68.75 h-10 justify-center'
        >
          {t('testsButton')}
        </Button>
        <div className='flex items-center gap-3'>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            className='hidden'
            onChange={handleFilesChange}
          />
          <Button
            type='button'
            variant='blue'
            className='w-68.75'
            onClick={handleAddAttachmentClick}
          >
            {t('addAttachment')}
            <PaperClipIcon className='h-8 w-8' />
          </Button>
        </div>
      </section>
      <section className='text-formErrorFont flex flex-col items-end gap-3'>
        <div className='flex'>
          <ul className='flex flex-col'>
            {attachments.map((fileName) => (
              <li
                key={fileName}
                className='w-68.75 flex items-center justify-between'
              >
                <span>{fileName}</span>
                <Button
                  type='button'
                  variant='ghost'
                  className='px-2 py-1 text-xs'
                  onClick={() => handleRemoveAttachment(fileName)}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className='mt-2'>
        <Button
          type='button'
          variant='success'
          className='h-10 w-full py-2'
          onClick={handleGoToTask}
        >
          {t('goToTask')}
        </Button>
      </div>
    </div>
  )
}
