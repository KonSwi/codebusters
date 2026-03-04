'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { ExtendedViewButton } from './ExtendedViewButton'
import { SidebarIconPicker, type SidebarIconName } from './SidebarIconPicker'

type SidebarProps = {
  isCollapsed: boolean
  onToggle: () => void
}

type Item = {
  key:
    | 'dashboard'
    | 'ranking'
    | 'lessons'
    | 'calendar'
    | 'task'
    | 'cssTask'
    | 'settings'
    | 'adminPanel'
  href: string
  icon: SidebarIconName
}

const ITEMS: Item[] = [
  { key: 'dashboard', href: '/dashboard', icon: 'dashboard' },
  { key: 'ranking', href: '/ranking', icon: 'ranking' },
  { key: 'lessons', href: '/lessons', icon: 'lessons' },
  { key: 'calendar', href: '/calendar', icon: 'calendar' },
  { key: 'task', href: '/task', icon: 'task' },
  { key: 'cssTask', href: '/css-task', icon: 'css-task' },
  { key: 'settings', href: '/settings', icon: 'settings' },
  { key: 'adminPanel', href: '/admin-panel', icon: 'admin-panel' },
]

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname()

  const seg = pathname.split('/')[1]
  const hasLocale = seg === 'pl' || seg === 'en'
  const localePrefix = hasLocale ? `/${seg}` : ''

  const t = useTranslations('signedIn.sidebar')

  return (
    <aside
      className={clsx(
        'bg-dark text-red sticky left-0 top-0 z-30 flex h-screen flex-col',
        {
          'w-15 items-center': isCollapsed,
          'w-55': !isCollapsed,
        }
      )}
    >
      <div
        className={clsx('mt-4', {
          'px-2.5': !isCollapsed,
        })}
      >
        <ExtendedViewButton isCollapsed={isCollapsed} onToggle={onToggle} />
      </div>
      <nav
        className={clsx('mt-6 flex flex-col gap-8', {
          'px-5': !isCollapsed,
        })}
      >
        {ITEMS.map((item) => {
          const isActive = pathname.endsWith(item.href)
          const linkHref = `${localePrefix}${item.href}`
          const iconClassName = clsx(
            'h-5 w-5 transition-transform group-hover:scale-150',
            {
              'text-orange': isActive,
              'text-white': !isActive,
            }
          )
          const linkClassName = clsx('group relative flex items-center', {
            'justify-center': isCollapsed,
            'gap-8': !isCollapsed,
            'text-orange': isActive,
            'text-white': !isActive,
          })

          return (
            <Link key={item.href} href={linkHref} className={linkClassName}>
              <SidebarIconPicker name={item.icon} className={iconClassName} />
              {!isCollapsed && <span className='text-sm'>{t(item.key)}</span>}
              {isCollapsed && (
                <span className='pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-white px-3 py-2 text-xs text-black opacity-0 transition-opacity group-hover:opacity-100'>
                  <span
                    aria-hidden='true'
                    className='absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white'
                  />
                  {t(item.key)}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
