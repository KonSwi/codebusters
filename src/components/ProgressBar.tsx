'use client'

import React from 'react'
import clsx from 'clsx'

type ProgressBarProps = {
  value: number
  showLabel?: boolean
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showLabel = false,
  className,
}) => {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className={clsx('relative w-full', className)}>
      <div className='bg-grayLightTask h-2 w-full overflow-hidden rounded-full'>
        <div
          className={clsx('h-full rounded-full', {
            'bg-green': safeValue === 100,
            'bg-orange': safeValue >= 50 && safeValue < 100,
            'bg-red': safeValue < 50,
          })}
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showLabel && (
        <span className='text-formErrorFont absolute -top-4 right-0'>
          {safeValue}%
        </span>
      )}
    </div>
  )
}
