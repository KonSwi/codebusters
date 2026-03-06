'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Button } from '@/components'

import type { ModuleTechnology } from '../useModule'

type ModuleDescriptionProps = {
  title: string
  input: string
  output: string
  technologies: ModuleTechnology[]
  onStart: () => void
}

export const ModuleDescription: React.FC<ModuleDescriptionProps> = ({
  title,
  input,
  output,
  technologies,
  onStart,
}) => {
  const t = useTranslations('signedIn.module')

  return (
    <div className='flex flex-col items-center gap-8 xl:flex-row xl:justify-between'>
      <article className='bg-gray xl:w-77.25 flex w-full flex-col gap-4 rounded-lg p-6'>
        <h2 className='text-articleBigFont'>{title}</h2>
        <div className='flex flex-col gap-2'>
          <div>
            <p className='text-orange uppercase'>
              {t('descriptionTab.inputLabel')}
            </p>
            <p>{input}</p>
          </div>
          <div>
            <p className='text-orange uppercase'>
              {t('descriptionTab.outputLabel')}
            </p>
            <p>{output}</p>
          </div>
        </div>
        <div>
          <Button
            variant='success'
            className='w-full px-5 py-2.5'
            onClick={onStart}
          >
            {t('descriptionTab.startButton')}
          </Button>
        </div>
      </article>
      <section className='flex-1'>
        <div className='flex flex-wrap justify-center gap-8 xl:justify-end'>
          {technologies.map((tech) => (
            <article
              key={tech.id}
              className='bg-codeBorder w-61 flex flex-col gap-6 rounded-lg p-4'
            >
              <div className='flex items-center gap-6'>
                <Image
                  src='/icons/CSS3.svg'
                  priority
                  width={30}
                  height={30}
                  alt='CSS3'
                />
                <span className='text-moduleTitleFont'>{tech.name}</span>
              </div>
              <p className='text-formErrorFont'>{tech.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
