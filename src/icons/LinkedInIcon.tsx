import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  size?: number
  className?: string
}

export const LinkedInIcon: React.FC<Props> = ({ size = 18, className }) => {
  return (
    <Image
      src='/icons/linkedin.svg'
      width={size}
      height={size}
      alt='LinkedIn'
      className={clsx(className)}
    />
  )
}
