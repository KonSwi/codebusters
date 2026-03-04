'use client'

import React from 'react'
import clsx from 'clsx'

type TaskDescriptionProps = {
  icon?: React.ReactNode
  meta?: React.ReactNode
  title: string
  titleClassName?: string
  titleRightIcon?: React.ReactNode
  description: string
  extra?: React.ReactNode
  gap?: '1.5' | '8'
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({
  icon,
  meta,
  title,
  titleClassName,
  titleRightIcon,
  description,
  extra,
  gap = '1.5',
}) => {
  const gapClass = clsx({
    'gap-8': gap === '8',
    'gap-1.5': gap !== '8',
  })

  return (
    <div className={clsx('flex h-full flex-col', gapClass)}>
      {(icon || meta) && (
        <div className='flex items-center gap-3 text-xs'>
          {icon}
          {meta}
        </div>
      )}
      <div className='flex items-center gap-4'>
        <h2
          className={clsx(
            'text-2xl font-semibold leading-tight',
            titleClassName
          )}
        >
          {title}
        </h2>
        {titleRightIcon}
      </div>
      <p className='whitespace-pre-wrap text-sm leading-6 text-neutral-100'>
        {description}
      </p>
      {extra}
    </div>
  )
}

export default TaskDescription
