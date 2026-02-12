'use client'

import { useTranslations } from 'next-intl'

export const Ranking = () => {
  const t = useTranslations('signedIn.pages')
  return <h1 className='text-dark'>{t('ranking')}</h1>
}
