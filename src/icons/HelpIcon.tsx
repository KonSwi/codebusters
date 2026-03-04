import React from 'react'
import clsx from 'clsx'

type Props = React.SVGProps<SVGSVGElement>

export const HelpIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={clsx('shrink-0', className)}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <path
        d='M6.80889 7.66667C7.41889 6.37222 9.06444 5.44444 11 5.44444C13.4556 5.44444 15.4444 6.93667 15.4444 8.77778C15.4444 10.3333 14.0244 11.6389 12.1044 12.0078C11.5022 12.1233 11 12.6078 11 13.2222M11 16.5556H11.0111M21 11C21 12.3132 20.7413 13.6136 20.2388 14.8268C19.7363 16.0401 18.9997 17.1425 18.0711 18.0711C17.1425 18.9997 16.0401 19.7363 14.8268 20.2388C13.6136 20.7413 12.3132 21 11 21C9.68678 21 8.38642 20.7413 7.17317 20.2388C5.95991 19.7363 4.85752 18.9997 3.92893 18.0711C3.00035 17.1425 2.26375 16.0401 1.7612 14.8268C1.25866 13.6136 1 12.3132 1 11C1 8.34784 2.05357 5.8043 3.92893 3.92893C5.8043 2.05357 8.34784 1 11 1C13.6522 1 16.1957 2.05357 18.0711 3.92893C19.9464 5.8043 21 8.34784 21 11Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}