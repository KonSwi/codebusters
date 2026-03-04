'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'
import { AddIcon } from '@/icons'
import { TasksListElement } from '@/components/tasksList'
import type { JavascriptAssignment } from '@/features/jsTaskList/useJSTasksLogic'
import { TasksList } from '@/components/tasksList/TasksList'

type CssTask = {
  id: string
  title: string
  description: string
}

const DEFAULT_VISIBLE = 6
const LOAD_MORE_STEP = 3

const mapCssTaskToJsAssignment = (task: CssTask): JavascriptAssignment => {
  return {
    id: task.id,
    name: task.title,
    category: 'FUNCTION',
    difficultyLevel: 'EASY',
    submissions: 0,
    descriptionStart: task.description,
    descriptionEnd: null,
    sampleInput: [],
    sampleOutput: [],
    tests: [],
    patternFunction: '',
    isSolved: false,
    source: 'CSS',
  }
}

export const CssTaskList = () => {
  const [tasks, setTasks] = React.useState<CssTask[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isError, setIsError] = React.useState<boolean>(false)
  const [visibleCount, setVisibleCount] =
    React.useState<number>(DEFAULT_VISIBLE)

  const router = useRouter()
  const { locale } = useParams<{ locale?: string }>()

  const t = useTranslations('signedIn.cssTask')

  React.useEffect(() => {
    let isCancelled = false

    const fetchTasks = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        const response = await fetch('/api/css-tasks')

        if (!response.ok) {
          if (!isCancelled) {
            setIsError(true)
          }
          return
        }

        const json: CssTask[] = await response.json()

        if (!isCancelled) {
          setTasks(json)
        }
      } catch {
        if (!isCancelled) {
          setIsError(true)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchTasks()

    return () => {
      isCancelled = true
    }
  }, [])

  const handleOpenTask = (id: string) => {
    const prefix = locale ? `/${locale}` : ''
    router.push(`${prefix}/css-task/${id}`)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP)
  }

  if (isLoading && tasks.length === 0) {
    return (
      <div className='text-formPlaceholder flex w-full items-center justify-center py-8 text-sm'>
        {t('list.loading')}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-red flex w-full items-center justify-center py-8 text-sm'>
        {t('list.error')}
      </div>
    )
  }

  const visibleTasks = tasks.slice(0, visibleCount)

  return (
    <TasksList>
      <div className='bg-blue flex w-full items-center gap-4 rounded-lg px-4 py-2.5 font-bold'>
        <div className='flex min-w-0 flex-1 items-center pr-4'>
          <div className='flex w-8 shrink-0 items-center'>
            {t('list.header.number')}
          </div>
          <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex-2 flex min-w-0 items-center px-2'>
            {t('list.header.title')}
          </div>
          <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex-2 flex min-w-0 items-center px-2'>
            {t('list.header.category')}
          </div>
          <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex-2 flex min-w-0 items-center px-2'>
            {t('list.header.difficulty')}
          </div>
          <div className='mx-2 w-3 shrink-0 rotate-90 border-t-2' />
          <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-sm font-bold' />
        </div>
        <div className='flex shrink-0'>
          <div className='min-w-60' />
        </div>
      </div>
      <div
        data-testid='css-tasks-lists-container'
        className='task-scroll max-h-100 mt-4 flex flex-col gap-2 overflow-y-auto'
      >
        {visibleTasks.map((task, index) => (
          <TasksListElement
            key={task.id}
            index={index + 1}
            assignment={mapCssTaskToJsAssignment(task)}
            onGoToTask={handleOpenTask}
          />
        ))}
        {visibleTasks.length === 0 && (
          <div className='text-sm text-neutral-400'>{t('list.empty')}</div>
        )}
      </div>
      {visibleTasks.length < tasks.length && (
        <div className='mt-4 flex justify-center'>
          <Button
            variant='blue'
            className='w-60 gap-2'
            onClick={handleLoadMore}
          >
            {t('list.loadMore')}
            <AddIcon className='h-5 w-5' />
          </Button>
        </div>
      )}
    </TasksList>
  )
}

export default CssTaskList
