'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react'
import { Button } from '@/components'

export const SignInTopBar = () => {
  const t = useTranslations('signedIn.topbar')
  const locale = useLocale()

  const dashboardHref = `/${locale}/dashboard`

  const handleLogout = () => {
    void signOut({
      callbackUrl: `/${locale}/`,
    })
  }

  return (
    <header className='bg-gray'>
      <div className='container flex h-14 items-center justify-between p-10'>
        <Link
          href={dashboardHref}
          aria-label={t('brand')}
          className='inline-flex items-center'
        >
          <Image
            src='/brand/logo.png'
            alt={t('brand')}
            priority
            width={120}
            height={44}
          />
        </Link>
        <nav className='flex items-center gap-10'>
          <Button variant='onlyText'>{t('brand')}</Button>
          <span aria-hidden='true' className='h-7 w-0.5 bg-white' />
          <Button
            type='button'
            variant='onlyText'
            aria-label={t('profile')}
            className='h-12 w-12 overflow-hidden rounded-full'
          >
            <Image
              src='/hero/heroImage.jpg'
              alt={t('profile')}
              width={48}
              height={48}
              className='h-full w-full object-cover'
            />
          </Button>
          <Button type='button' variant='onlyText' onClick={handleLogout}>
            {t('logout')}
          </Button>
        </nav>
      </div>
    </header>
  )
}
