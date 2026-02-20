import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  size?: number
  className?: string
}

export const YouTubeIcon: React.FC<Props> = ({ size = 18, className }) => {
  return (
    <Image
      src='/icons/youtube.svg'
      width={size}
      height={size}
      alt='YouTube'
      className={clsx(className)}
    />
  )
}
