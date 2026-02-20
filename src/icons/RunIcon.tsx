import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const RunIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 13 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 1.56473C0 0.376283 1.27417 -0.377094 2.3155 0.195638L11.9327 5.48507C13.012 6.07871 13.012 7.62961 11.9326 8.22324L2.3155 13.5127C1.27416 14.0854 0 13.332 0 12.1436V1.56473Z'
        fill='currentColor'
      />
    </svg>
  )
}
