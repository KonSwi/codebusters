import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  size?: number
  className?: string
}

export const TikTokIcon: React.FC<Props> = ({ size = 18, className }) => {
  return (
    <Image
      src='/icons/tiktok.svg'
      width={size}
      height={size}
      alt='TikTok'
      className={clsx(className)}
    />
  )
}
