import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const FolderIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <path
        d='M2.66675 4.66659C2.66675 3.93021 3.26369 3.33325 4.00008 3.33325H6.66675L8.00008 4.66659H12.0001C12.7365 4.66659 13.3334 5.26354 13.3334 5.99992V11.3333C13.3334 12.0697 12.7365 12.6666 12.0001 12.6666H4.00008C3.26369 12.6666 2.66675 12.0697 2.66675 11.3333V4.66659Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  )
}
