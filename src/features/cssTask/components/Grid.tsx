import React from 'react'

type GridProps = {
  left: React.ReactNode
  middle: React.ReactNode
  right: React.ReactNode
}

export const Grid: React.FC<GridProps> = ({ left, middle, right }) => {
  return (
    <div className='flex h-full w-full flex-col gap-8 lg:flex-row'>
      <div className='flex min-w-0 flex-1 flex-col'>{left}</div>
      <div className='lg:w-91.25 xl:w-182.5 flex flex-col gap-4 xl:flex-none xl:flex-row'>
        <div className='xl:w-91.25 flex flex-1 flex-col'>{middle}</div>
        <div className='xl:w-91.25 flex flex-1 flex-col'>{right}</div>
      </div>
    </div>
  )
}
