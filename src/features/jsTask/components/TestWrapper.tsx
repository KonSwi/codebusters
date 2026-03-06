'use client'

import React from 'react'
import clsx from 'clsx'

import { Button } from '@/components'

export type TaskPanelTab = {
  id: string
  label: string
}

export type TaskPanelProps = {
  tabs: TaskPanelTab[]
  activeTabId: string
  onTabChange?: (id: string) => void
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  children,
  className,
  contentClassName,
}) => {
  return (
    <section
      className={clsx(
        'bg-gray flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.6)]',
        className
      )}
    >
      <div className='flex shrink-0'>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId

          return (
            <Button
              key={tab.id}
              type='button'
              variant='blue'
              onClick={() => {
                if (!onTabChange || isActive) return
                onTabChange(tab.id)
              }}
              className={clsx(
                'text-formErrorFont h-9 shrink-0 rounded-none px-4 font-medium',
                {
                  'bg-blue shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]':
                    isActive,
                  'bg-blueOff': !isActive,
                }
              )}
              aria-pressed={isActive}
            >
              {tab.label}
            </Button>
          )
        })}
        <div className='bg-grayLightTask flex-1 shadow-[0px_4px_4px_0px_#00000040]' />
      </div>
      <div
        className={clsx(
          'task-scroll min-h-0 flex-1 overflow-y-auto',
          { 'p-4': !contentClassName },
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
