'use client'

import { useTranslations } from 'next-intl'

export const Settings = () => {
  const t = useTranslations('signedIn.pages')
  return <h1 className='text-dark'>{t('settings')}</h1>
}
