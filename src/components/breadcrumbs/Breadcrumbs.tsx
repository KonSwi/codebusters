'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { BreadcrumbsElement } from './BreadcrumbsElement'

export type BreadcrumbItem = {
  label: string
  href: string
  isCurrent?: boolean
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const router = useRouter()

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='text-formFont bg-gray inline-flex h-10 w-fit flex-wrap content-center items-center gap-4 rounded-lg px-5 py-3'>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <span className='text-moduleTitleFont'>{'>'}</span>}
            <BreadcrumbsElement
              label={item.label}
              onClick={() => router.push(item.href)}
            />
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}
