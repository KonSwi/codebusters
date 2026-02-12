'use client'

import { useTranslations } from 'next-intl'

export const Lessons = () => {
  const t = useTranslations('signedIn.pages')
  return <h1 className='text-dark'>{t('lessons')}</h1>
}
