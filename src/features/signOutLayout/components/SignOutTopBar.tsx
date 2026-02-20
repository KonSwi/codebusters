'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useTranslations, useLocale } from 'next-intl'

import { Button } from '@/components'

export const SignOutTopBar = () => {
  const t = useTranslations('landing.topbar')
  const locale = useLocale()
  const pathname = usePathname()
  const homeHref = `/${locale}/landing`
  const registerHref = `/${locale}/register`
  const loginHref = `/${locale}/login`
  const isRegisterPage = pathname?.includes('/register')
  const isLoginPage = pathname?.includes('/login')

  return (
    <header className='bg-gray'>
      <div className='container flex h-14 items-center justify-between p-10'>
        <Link
          href={homeHref}
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
          <Button variant='onlyText' disabled>
            {t('brand')}
          </Button>
          <span className='font-medium'>|</span>
          <Link
            href={loginHref}
            className={clsx(
              'w-37.5 gap-2 rounded-lg px-3 py-2 text-center font-medium',
              {
                'text-orange': isLoginPage,
                'text-white': !isLoginPage,
              }
            )}
          >
            {t('login')}
          </Link>
          <Link
            href={registerHref}
            className={clsx(
              'w-37.5 gap-2 rounded-lg px-3 py-2 text-center font-medium text-white',
              {
                'bg-orange': isRegisterPage,
                'bg-blue': !isRegisterPage,
              }
            )}
          >
            {t('register')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
