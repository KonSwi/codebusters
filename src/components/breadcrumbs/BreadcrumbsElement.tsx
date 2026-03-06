'use client'

import React from 'react'

type BreadcrumbsElementProps = {
  label: string
  onClick: () => void
}

export const BreadcrumbsElement: React.FC<BreadcrumbsElementProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='text-formFont text-xs transition hover:text-white/50 cursor-pointer'
    >
      {label}
    </button>
  )
}
