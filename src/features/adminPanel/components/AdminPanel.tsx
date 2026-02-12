'use client'

import { useTranslations } from 'next-intl'

export const AdminPanel = () => {
  const t = useTranslations('signedIn.pages')
  return <h1 className='text-dark'>{t('adminPanel')}</h1>
}
