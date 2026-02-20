import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  size?: number
  className?: string
}

export const InstagramIcon: React.FC<Props> = ({ size = 18, className }) => {
  return (
    <Image
      src='/icons/instagram.svg'
      width={size}
      height={size}
      alt='Instagram'
      className={clsx(className)}
    />
  )
}
