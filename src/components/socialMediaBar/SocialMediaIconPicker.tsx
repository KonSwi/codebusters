import React from 'react'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export const SocialMediaIconPicker: React.FC<Props> = ({
  src,
  alt,
  width,
  height,
  className = 'h-5 w-5',
  priority = true,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  )
}
