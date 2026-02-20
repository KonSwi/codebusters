import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const SubmitIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <path
        d='M1 1H11.8333H1ZM1 4.33333H8.5H1ZM1 7.66667H6H1ZM9.33333 7.66667L12.6667 4.33333L9.33333 7.66667ZM12.6667 4.33333L16 7.66667L12.6667 4.33333ZM12.6667 4.33333V14.3333Z'
        fill='currentColor'
      />
      <path
        d='M12.6667 4.33333V14.3333M1 1H11.8333H1ZM1 4.33333H8.5H1ZM1 7.66667H6H1ZM9.33333 7.66667L12.6667 4.33333L9.33333 7.66667ZM12.6667 4.33333L16 7.66667L12.6667 4.33333Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
