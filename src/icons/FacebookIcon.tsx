import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  size?: number
  className?: string
}

export const FacebookIcon: React.FC<Props> = ({ size = 18, className }) => {
  return (
    <Image
      src='/icons/facebook.svg'
      width={size}
      height={size}
      alt='Facebook'
      className={clsx(className)}
      priority={false}
    />
  )
}
