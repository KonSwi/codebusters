import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const BackIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 9 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <path
        d='M8 15L1 8L8 1'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
