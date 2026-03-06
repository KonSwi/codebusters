import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const DocumentDuplicateIcon: React.FC<Props> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <defs>
        <mask id='doc-duplicate-back-mask' maskUnits='userSpaceOnUse'>
          <rect x='0' y='0' width='24' height='24' fill='white' />
          <path
            d='M9 4H15L19 8V16a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'
            fill='black'
          />
        </mask>
      </defs>

      <rect
        x='5'
        y='8'
        width='10'
        height='12'
        rx='2'
        stroke='currentColor'
        strokeWidth='2'
        mask='url(#doc-duplicate-back-mask)'
      />

      <path
        d='M10 4C8.4 4 9 4.4 9 5V6a2 2 0 0 1 2-2H16L20 8V15a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
        strokeLinecap='round'
      />
    </svg>
  )
}
