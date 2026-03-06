'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import { useParams } from 'next/navigation'

import { Breadcrumbs, type BreadcrumbItem } from '@/components/breadcrumbs'
import {
  ClockIcon,
  FolderIcon,
  LevelIcon,
  DocumentDuplicateIcon,
} from '@/icons'
import { TopBarTask } from '@/components/TopBarTask'
import { ProgressBar } from '@/components'
import { LoadingModal } from '@/components/LoadingModal'

import { ModuleSprint } from './ModuleSprint'
import { ModuleDescription } from './ModuleDescription'
import { useModule } from '../useModule'

export const Module = () => {
  const [activeTabId, setActiveTabId] = React.useState<
    'description' | 'sprints'
  >('description')

  const t = useTranslations('signedIn.module')

  const { locale, moduleId } = useParams<{
    locale: string
    moduleId: string
  }>()

  const breadcrumbsItems: BreadcrumbItem[] = [
    {
      label: t('breadcrumbs.modules'),
      href: `/${locale}/modules`,
    },
    {
      label: t('breadcrumbs.module'),
      href: `/${locale}/modules/${moduleId}`,
      isCurrent: true,
    },
  ]

  const { module, isLoading, isError } = useModule()

  if (isLoading) {
    return <LoadingModal />
  }

  if (isError || !module) {
    return (
      <div className='text-red flex h-full w-full items-center justify-center p-6 text-center'>
        {t('errors.loading')}
      </div>
    )
  }

  const moduleDescription = {
    input: module.input,
    output: module.output,
  }

  const tabs = [
    { id: 'description', label: t('tabs.description') },
    { id: 'sprints', label: t('tabs.sprints') },
  ]

  return (
    <div className='flex h-full w-full justify-center'>
      <div className='max-w-448.75 flex h-full w-full flex-col gap-6'>
        <Breadcrumbs items={breadcrumbsItems} />
        <div className='task-scroll flex flex-1 flex-col gap-8 overflow-y-auto'>
          <section className='flex w-full flex-col items-center gap-16 xl:flex-row'>
            <div className='flex h-full w-full min-w-0 flex-1 flex-col justify-between gap-6'>
              <header className='flex flex-col gap-2'>
                <h1 className='text-articleBigFont'>{module.title}</h1>
                <p>{module.description}</p>
              </header>
              <ProgressBar value={module.progress} showLabel />
              <div className='text-formErrorFont flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                  <FolderIcon className='h-5 w-5' />
                  <span>
                    {module.sprintsCount} {t('sprintsLabel')}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <DocumentDuplicateIcon className='h-5 w-5' />
                  <span>
                    {module.tasksCount} {t('tasksLabel')}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <LevelIcon className='h-5 w-5' />
                  <span>{module.difficultyLabel}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <ClockIcon className='h-5 w-5' />
                  <span>{module.durationHours}h</span>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center xl:justify-end'>
              <div className='w-101.25'>
                <div className='aspect-video'>
                  <LiteYouTubeEmbed id={module.videoId} title={module.title} />
                </div>
              </div>
            </div>
          </section>
          <section>
            <TopBarTask
              variant='dark'
              tabs={tabs}
              activeTabId={activeTabId}
              onTabChange={(id) => {
                if (id === 'description' || id === 'sprints') {
                  setActiveTabId(id)
                }
              }}
            >
              {activeTabId === 'description' ? (
                <ModuleDescription
                  title={module.title}
                  input={moduleDescription.input}
                  output={moduleDescription.output}
                  technologies={module.technologies}
                  onStart={() => setActiveTabId('sprints')}
                />
              ) : (
                <ModuleSprint sprints={module.sprints} />
              )}
            </TopBarTask>
          </section>
        </div>
      </div>
    </div>
  )
}
