'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components'

export const Footer = () => {
  const t = useTranslations('landing.footer')

  return (
    <footer
      role='contentinfo'
      className='bg-gray fixed inset-x-0 bottom-0 z-50 h-20'
    >
      <div className='container flex h-full flex-row items-center justify-between gap-3 px-10'>
        <nav className='flex items-center gap-10'>
          <Button variant='onlyText' disabled>
            {t('site')}
          </Button>
          <span className='font-medium'>|</span>
          <Button variant='onlyText' disabled>
            {t('privacy')}
          </Button>
          <span className='font-medium'>|</span>
          <Button variant='onlyText' disabled>
            {t('contact')}
          </Button>
        </nav>
        <div className='inline-flex items-center gap-1.5 font-medium'>
          <span>💛</span>
          <span>{t('copyright')}</span>
        </div>
      </div>
    </footer>
  )
}
