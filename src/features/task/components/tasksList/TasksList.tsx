'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components'
import { AddIcon } from '@/icons'

import { useTasksLogic } from './useTasksLogic'
import { TasksListElement } from './TasksListElement'

export const TasksList = () => {
  const router = useRouter()
  const locale = useLocale()
  const { tasks, isLoading, isError, loadMore } = useTasksLogic()
  const t = useTranslations('signedIn.task.list')

  const handleGoToTask = (id: string) => {
    router.push(`/${locale}/task/${id}`)
  }

  if (isLoading && tasks.length === 0) {
    return (
      <div className='text-formPlaceholder flex w-full items-center justify-center py-8 text-sm'>
        {t('loading')}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-red flex w-full items-center justify-center py-8 text-sm'>
        {t('error')}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-blue flex w-full items-center gap-4 rounded-lg px-4 py-2.5 font-bold'>
        <div className='flex min-w-0 flex-1 items-center pr-4'>
          <div className='flex w-8 shrink-0 items-center'>
            {t('header.number')}
          </div>
          <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex-2 flex min-w-0 items-center px-2'>
            {t('header.title')}
          </div>
          <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex-2 flex min-w-0 items-center px-2'>
            {t('header.category')}
          </div>
          <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex-2 flex min-w-0 items-center px-2'>
            {t('header.difficulty')}
          </div>
          <div className='mx-2 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-sm font-bold' />
        </div>
        <div className='flex shrink-0'>
          <div className='min-w-60' />
        </div>
      </div>
      <div
        data-testid='tasks-lists-container'
        className='task-scroll max-h-100 flex flex-col gap-2 overflow-y-auto'
      >
        {tasks.map((task, index) => (
          <TasksListElement
            key={task.id}
            index={index + 1}
            assignment={task}
            onGoToTask={handleGoToTask}
          />
        ))}
      </div>
      <div className='flex justify-center'>
        <Button variant='blue' className='w-60 gap-2' onClick={loadMore}>
          {t('loadMore')} <AddIcon className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}
