'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components'

export const Trust = () => {
  const t = useTranslations('landing.content')

  return (
    <section className='container flex justify-center py-16'>
      <div className='max-w-197.5 border-grayBorder flex flex-col items-start gap-2 rounded-lg border-2 p-8 shadow-[0_0.125rem_0.25rem_-0.125rem_#0000000D,0_0.25rem_0.375rem_-0.0625rem_#0000001A]'>
        <h3 className='text-titleSmallFont text-dark font-extralight'>
          {t('trust.title')}
        </h3>
        <p className='text-articleSmallFont text-grayLight font-extralight'>
          {t('trust.body')}
        </p>
        <Button variant='linkText' className='p-0' disabled>
          {t('trust.ctaMeet')}
        </Button>
      </div>
    </section>
  )
}
