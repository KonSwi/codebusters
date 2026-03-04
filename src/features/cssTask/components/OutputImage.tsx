import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

type OutputImageProps = {
  src: string
  alt: string
  className?: string
}

export const OutputImage: React.FC<OutputImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <div className={clsx('relative h-full w-full overflow-hidden', className)}>
      <Image src={src} alt={alt} fill sizes='100vw' className='object-cover' />
    </div>
  )
}
