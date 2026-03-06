'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { Breadcrumbs, type BreadcrumbItem } from '@/components/breadcrumbs'
import { LoadingModal } from '@/components/LoadingModal'

import { useModulesLogic } from '../useModulesLogic'
import { ModuleCard } from './ModuleCard'

const Modules = () => {
  const { modules, isLoading, isError } = useModulesLogic()

  const t = useTranslations('signedIn.modules')
  const { locale } = useParams<{ locale: string }>()

  const breadcrumbsItems: BreadcrumbItem[] = [
    {
      label: t('breadcrumbsLabel'),
      href: `/${locale}/modules`,
      isCurrent: true,
    },
  ]

  if (isLoading) {
    return <LoadingModal />
  }

  if (isError) {
    return (
      <div data-testid='modules-error' className='text-red p-6 text-center'>
        {t('errors.loading')}
      </div>
    )
  }

  return (
    <div className='flex h-full w-full min-w-0 justify-center'>
      <div className='max-w-448.75 flex h-full w-full min-w-0 flex-col gap-6'>
        <Breadcrumbs items={breadcrumbsItems} />
        <div
          className='task-scroll flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto'
          data-testid='module-container'
        >
          <header className='flex min-w-0 flex-col items-center justify-center gap-6 px-4'>
            <h1 className='text-articleBigFont text-center'>{t('title')}</h1>
            <p className='text-formFont max-w-183 xl:max-w-278.5 2xl:max-w-391 w-full text-center'>
              {t('description')}
            </p>
          </header>
          <div className='flex flex-wrap justify-center gap-8'>
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Modules }
