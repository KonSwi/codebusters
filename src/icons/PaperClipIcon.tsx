import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const PaperClipIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      style={{ transform: 'rotate(45deg)' }}
      {...props}
    >
      <path
        d='
          M10.6667 5.33333
          V10
          C10.6667 11.4728 9.4728 12.6667 8 12.6667
          C6.5272 12.6667 5.33333 11.4728 5.33333 10
          V5.33333
          C5.33333 4.22876 6.22876 3.33333 7.33333 3.33333
          C8.4379 3.33333 9.33333 4.22876 9.33333 5.33333
          V9.33333
          C9.33333 9.88562 8.88562 10.3333 8.33333 10.3333
          C7.78105 10.3333 7.33333 9.88562 7.33333 9.33333
          V5.33333
        '
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
