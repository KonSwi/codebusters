'use client'

import { useTranslations } from 'next-intl'

export const Calendar = () => {
  const t = useTranslations('signedIn.pages')
  return <h1 className='text-dark'>{t('calendar')}</h1>
}
