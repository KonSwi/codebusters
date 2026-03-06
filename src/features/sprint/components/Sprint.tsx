'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ClockIcon, LevelIcon, DocumentDuplicateIcon } from '@/icons'
import { Button, ProgressBar } from '@/components'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/breadcrumbs'
import { Kanban } from '@/features/kanban'
import { LoadingModal } from '@/components/LoadingModal'

import { useSprint } from './useSprint'

export const Sprint = () => {
  const { locale, moduleId, sprintId } = useParams<{
    locale: string
    moduleId: string
    sprintId: string
  }>()

  const t = useTranslations('signedIn.sprint')

  const { data: sprint, isLoading, isError } = useSprint(sprintId)

  const breadcrumbsItems: BreadcrumbItem[] = [
    {
      label: t('breadcrumbs.modules'),
      href: `/${locale}/modules`,
    },
    {
      label: t('breadcrumbs.module'),
      href: `/${locale}/modules/${moduleId}`,
    },
    {
      label: t('breadcrumbs.sprint'),
      href: `/${locale}/modules/${moduleId}/${sprintId}`,
      isCurrent: true,
    },
  ]

  if (isLoading) {
    return <LoadingModal />
  }

  if (isError || !sprint) {
    return (
      <div data-testid='sprint-error' className='text-red p-6 text-center'>
        {t('errors.loading')}
      </div>
    )
  }

  return (
    <div className='flex h-full w-full justify-center gap-8'>
      <div className='max-w-448.75 flex h-full w-full flex-col gap-4'>
        <Breadcrumbs items={breadcrumbsItems} />
        <div
          className='task-scroll flex flex-1 flex-col gap-8 overflow-y-auto'
          data-testid='sprint-container'
        >
          <section className='flex w-full flex-col items-center gap-16 xl:flex-row'>
            <div className='flex h-full w-full min-w-0 flex-1 flex-col justify-between gap-6'>
              <header className='flex flex-col gap-2'>
                <h1 className='text-articleBigFont'>{sprint.title}</h1>
              </header>
              <ProgressBar value={sprint.progress} showLabel />
              <div className='text-formErrorFont flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                  <DocumentDuplicateIcon className='h-5 w-5' />
                  <span>
                    {sprint.tasksCount} {t('tasksLabel')}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <LevelIcon className='h-5 w-5' />
                  <span>{sprint.difficultyLabel}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <ClockIcon className='h-5 w-5' />
                  <span>{sprint.durationHours}h</span>
                </div>
              </div>
            </div>
          </section>
          <section className='flex h-full flex-col overflow-hidden rounded-lg'>
            <div className='bg-grayLightTask border-b-codeBorder flex border-b'>
              <Button
                type='button'
                variant='blue'
                className='text-formErrorFont h-9 shrink-0 rounded-none p-4 shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]'
                aria-pressed
              >
                {t('taskListButton')}
              </Button>
            </div>
            <Kanban activityIds={sprint.activities} />
          </section>
        </div>
      </div>
    </div>
  )
}
