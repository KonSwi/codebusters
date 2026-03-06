'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components'
import { ClockIcon, FolderIcon, LevelIcon } from '@/icons'
import { ProgressBar } from '@/components'

import type { ModuleSprintItem } from '../useModule'

type ModuleSprintProps = {
  sprints: ModuleSprintItem[]
}

export const ModuleSprint: React.FC<ModuleSprintProps> = ({ sprints }) => {
  const router = useRouter()
  const { locale, moduleId } = useParams<{ locale: string; moduleId: string }>()

  const t = useTranslations('signedIn.module')

  const handleOpenSprint = (sprintId: string) => {
    router.push(`/${locale}/modules/${moduleId}/${sprintId}`)
  }

  return (
    <div className='flex flex-col gap-8 p-4'>
      {sprints.map((sprint) => (
        <article
          key={sprint.id}
          className='bg-codeBorder flex gap-8 rounded-lg p-8'
        >
          <div className='w-79.25 relative overflow-hidden rounded-lg'>
            <Image
              src={sprint.imageSrc}
              alt={sprint.title}
              fill
              className='object-cover'
            />
          </div>
          <div className='flex flex-1 flex-col gap-4'>
            <h2 className='text-moduleTitleFont'>{sprint.title}</h2>
            <p>{sprint.description}</p>
            <div className='text-formErrorFont flex flex-wrap gap-4'>
              <div className='flex items-center gap-2'>
                <FolderIcon className='h-5 w-5' />
                <span>
                  {sprint.tasksCount} {t('tasksLabel')}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <ClockIcon className='h-5 w-5' />
                <span>{sprint.durationHours}h</span>
              </div>
              <div className='flex items-center gap-2'>
                <LevelIcon className='h-5 w-5' />
                <span>{sprint.difficultyLabel}</span>
              </div>
            </div>
            <div className='flex gap-4'>
              <p className='text-formFont'>{t('sprints.learnLabel')}</p>
              <Image
                src='/icons/CSS3.svg'
                priority
                width={30}
                height={30}
                alt='CSS3'
              />{' '}
              <Image
                src='/icons/CSS3.svg'
                priority
                width={30}
                height={30}
                alt='CSS3'
              />{' '}
              <Image
                src='/icons/CSS3.svg'
                priority
                width={30}
                height={30}
                alt='CSS3'
              />
            </div>
            <Button
              variant='success'
              className='w-75 mb-4'
              onClick={() => handleOpenSprint(sprint.id)}
            >
              {t('sprints.openButtonLabel')}
            </Button>
            <ProgressBar value={sprint.progress} showLabel />
          </div>
        </article>
      ))}
    </div>
  )
}
