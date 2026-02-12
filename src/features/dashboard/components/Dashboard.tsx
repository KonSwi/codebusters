'use client'

import { useTranslations } from 'next-intl'

export const Dashboard = () => {
  const t = useTranslations('signedIn.pages')
  return <h1 className='text-dark'>{t('dashboard')}</h1>
}
