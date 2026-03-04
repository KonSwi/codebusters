'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'
import { RunIcon } from '@/icons'

import { JavascriptAssignment } from '@/features/jsTaskList/useJSTasksLogic'

type TasksListElementProps = {
  index: number
  assignment: JavascriptAssignment
  onGoToTask: (id: string) => void
}

export const TasksListElement: React.FC<TasksListElementProps> = ({
  index,
  assignment,
  onGoToTask,
}) => {
  const t = useTranslations('signedIn.task.list')

  const difficultyLabelMap: Record<
    JavascriptAssignment['difficultyLevel'],
    string
  > = {
    EASY: t('difficulty.easy'),
    MEDIUM: t('difficulty.medium'),
    HARD: t('difficulty.hard'),
  }

  const categoryLabelMap: Record<JavascriptAssignment['category'], string> = {
    FUNCTION: t('category.function'),
    LOOP: t('category.loop'),
  }
  const isSolved = assignment.isSolved

  return (
    <div className='bg-codeBorder flex w-full items-center gap-4 rounded-lg px-4 py-2.5 font-bold'>
      <div className='flex min-w-0 flex-1 items-center pr-4'>
        <div className='flex w-8 shrink-0 items-center gap-2'>{index}.</div>
        <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
        <div className='flex-2 flex min-w-0 items-center gap-2 px-2'>
          {assignment.name}
        </div>
        <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
        <div className='flex-2 flex min-w-0 items-center gap-2 px-2'>
          {categoryLabelMap[assignment.category]}
        </div>
        <div className='mx-4 w-3 shrink-0 rotate-90 border-t-2' />
        <div className='flex-2 flex min-w-0 items-center gap-2 px-2'>
          {difficultyLabelMap[assignment.difficultyLevel]}
        </div>
        <div className='mx-2 w-3 shrink-0 rotate-90 border-t-2' />
        <div className='flex w-6 shrink-0 items-center justify-center'>
          {isSolved && (
            <div className='bg-green flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-sm font-bold'>
              ✓
            </div>
          )}
        </div>
      </div>
      <div className='flex shrink-0'>
        <Button
          variant={isSolved ? 'success' : 'orange'}
          className='min-w-60 flex gap-2 px-4'
          onClick={() => onGoToTask(assignment.id)}
        >
          {t('goToTask')}
          <RunIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
