'use client'

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'

type TargetViewProps = {
  targetImageUrl: string | null
}

export const TargetView: React.FC<TargetViewProps> = ({ targetImageUrl }) => {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null)

  const t = useTranslations('signedIn.cssTask')

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch {}
  }

  const colors = [
    '#F5A22E',
    '#F5A22E',
    '#F5A22E',
    '#F5A22E',
    '#F5A22E',
    '#F5A22E',
  ]

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg'>
      <div className='bg-gray border-b-codeBorder flex border-b'>
        <Button
          type='button'
          variant='blue'
          className='text-formErrorFont h-9 shrink-0 rounded-none px-4 text-sm font-medium shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]'
          aria-pressed
        >
          {t('panels.target')}
        </Button>
      </div>
      <div className='bg-gray relative flex flex-1 flex-col gap-4 rounded-b-lg p-4'>
        <div className='flex items-center justify-center rounded-lg'>
          <div className='h-66.5 w-83.25 bg-white'>
            {targetImageUrl && (
              <Image
                src={targetImageUrl}
                alt='Target'
                width={333}
                height={266}
                className='h-full w-full object-contain'
              />
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 rounded-lg p-3'>
          {colors.map((color, index) => (
            <button
              key={`${color}-${index}`}
              type='button'
              onClick={() => handleCopy(color)}
              className={clsx(
                'group flex items-center gap-3 rounded-lg px-3 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
                'bg-codeBorder cursor-pointer'
              )}
            >
              <span
                className='h-4 w-4 rounded-full'
                style={{ backgroundColor: color }}
              />
              <span className='text-xs text-neutral-100 transition group-hover:text-white'>
                {color}
              </span>
            </button>
          ))}
        </div>
        {copiedColor && (
          <div className='border-blue bg-lightGreen text-dark text-formErrorFont absolute bottom-2 right-2 rounded-lg border px-4 py-2'>
            {t('copied')}: {copiedColor}
          </div>
        )}
      </div>
    </div>
  )
}

export default TargetView
