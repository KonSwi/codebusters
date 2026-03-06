'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

import { ClockIcon, FolderIcon, LevelIcon } from '@/icons'
import { Button } from '@/components'

import type { Module } from '../useModulesLogic'

type ModuleCardProps = {
  module: Module
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

  const t = useTranslations('signedIn.modules')

  const handleEnterModule = () => {
    router.push(`/${locale}/modules/${module.id}`)
  }

  return (
    <article className='w-87.5 bg-gray 2xl:w-125 flex flex-col justify-between gap-4 rounded-lg p-4'>
      <div className='relative h-44 w-full overflow-hidden rounded-lg'>
        <Image
          src='/hero/heroImage.jpg'
          alt={module.title}
          fill
          className='object-cover'
        />
      </div>
      <h3 className='text-moduleTitleFont'>{module.title}</h3>
      <div className='h-px w-full bg-white' />
      <div className='text-formFont flex flex-col gap-2'>
        <div>
          <p className='text-orange uppercase'>{t('inputLabel')}</p>
          <p>{module.input}</p>
        </div>
        <div>
          <p className='text-orange uppercase'>{t('outputLabel')}</p>
          <p>{module.output}</p>
        </div>
      </div>
      <div className='text-formErrorFont flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <FolderIcon className='h-6 w-6' />
          <span>
            {module.sprintsCount} {t('sprintsLabel')}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <LevelIcon className='h-6 w-6' />
          <span>{module.difficulty}</span>
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='h-6 w-6' />
          <span>{module.durationHours}h</span>
        </div>
      </div>
      <div className='h-px w-full bg-white' />
      <Button variant='blue' type='button' onClick={handleEnterModule}>
        {t('enterModule')}
      </Button>
      <div className='flex w-full items-center justify-between gap-2'>
        {(
          [
            'sprint1',
            'sprint2',
            'sprint3',
            'sprint4',
            'sprint5',
            'sprint6',
          ] as const
        ).map((key, index, arr) => {
          const value = module[key]

          return (
            <React.Fragment key={key}>
              <div
                className={clsx(
                  'flex items-center justify-center rounded-full',
                  'aspect-square w-8',
                  {
                    'bg-green': value === 100,
                    'bg-orange': value >= 50 && value < 100,
                    'bg-red': value < 50,
                  }
                )}
              >
                <span className='text-formErrorFont'>
                  {value === 100 ? '✔' : `${value}%`}
                </span>
              </div>
              {index < arr.length - 1 && (
                <div className='h-px flex-1 bg-white' />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </article>
  )
}
