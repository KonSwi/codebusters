'use client'

import React from 'react'

type ContentWrapperProps = {
  children: React.ReactNode
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className='flex h-full min-h-0 w-full flex-col gap-4'>
      {children}
    </div>
  )
}

export default ContentWrapper
