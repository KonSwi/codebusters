'use client'

import React from 'react'
import clsx from 'clsx'

type Props = {
  isCollapsed: boolean
  onToggle: () => void
}

const DoubleChevronIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width='17'
      height='16'
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        d='M8 15L1 8L8 1M16 15L9 8L16 1'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const ExtendedViewButton: React.FC<Props> = ({
  isCollapsed,
  onToggle,
}) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className='bg-gray flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-white'
    >
      <DoubleChevronIcon
        className={clsx('w-3.75 h-3.5', {
          'rotate-180': !isCollapsed,
        })}
      />
    </button>
  )
}
