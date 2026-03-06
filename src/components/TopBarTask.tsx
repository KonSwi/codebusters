'use client'

import React from 'react'
import clsx from 'clsx'

import { Button } from './Button'

export type TopBarTab = {
  id: string
  label: string
}

type TopBarTaskVariant = 'light' | 'dark'

type TopBarTaskProps = {
  tabs: TopBarTab[]
  activeTabId: string
  onTabChange?: (id: string) => void
  children: React.ReactNode
  className?: string
  contentClassName?: string
  variant?: TopBarTaskVariant
}

export const TopBarTask: React.FC<TopBarTaskProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  children,
  className,
  contentClassName,
  variant = 'light',
}) => {
  return (
    <section
      className={clsx(
        'bg-gray flex flex-col overflow-hidden rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.6)]',
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
        <div
          className={clsx('flex-1 shadow-[0px_4px_4px_0px_#00000040]', {
            'bg-grayLightTask': variant === 'light',
            'bg-gray': variant === 'dark',
          })}
        />
      </div>
      <div className={clsx('flex-1 p-4', contentClassName)}>{children}</div>
    </section>
  )
}
