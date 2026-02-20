'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'

export const HeroImage = () => {
  const t = useTranslations('landing.hero')

  return (
    <section
      data-testid='hero-image'
      className='h-120 relative w-full overflow-hidden'
    >
      <div className='bg-gray/90 absolute inset-0' />
      <div className='py-21.25 container relative z-10 flex flex-col items-center gap-3'>
        <h1 className='text-titleBigFont leading-15 font-extrabold tracking-[-0.01rem]'>
          {t('title')}
        </h1>
        <div className='inline-flex flex-col items-center gap-2'>
          <span className='text-articleBigFont'>{t('by')}</span>
          <Image
            src='/hero/devstockBaner.svg'
            alt={t('brand')}
            width={180}
            height={46}
            className='w-45 h-auto'
            priority
          />
        </div>
        <p className='max-w-184 text-articleBigFont text-center'>
          {t('subtitle')}
        </p>
        <div className='flex flex-wrap items-center gap-8'>
          <Button variant='red' disabled>
            {t('ctaStart')}
          </Button>
          <Button variant='transparent' disabled>
            {t('ctaAcademy')}
          </Button>
        </div>
      </div>
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/hero/heroImage.jpg'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
      </div>
    </section>
  )
}
