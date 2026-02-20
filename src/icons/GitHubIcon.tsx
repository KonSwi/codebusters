import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  size?: number
  className?: string
}

export const GitHubIcon: React.FC<Props> = ({ size = 18, className }) => {
  return (
    <Image
      src='/icons/github.svg'
      width={size}
      height={size}
      alt='GitHub'
      className={clsx(className)}
    />
  )
}
