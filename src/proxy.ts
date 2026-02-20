import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const intlMiddleware = createMiddleware({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'always',
  localeDetection: false,
})

const PUBLIC_PATHS = ['/landing', '/login', '/register']
const PRIVATE_PATHS = [
  '/dashboard',
  '/ranking',
  '/lessons',
  '/calendar',
  '/settings',
  '/admin-panel',
  '/task',
]

type Locale = 'pl' | 'en'
const LOCALE_COOKIE = 'NEXT_LOCALE'

function isLocale(seg: string | undefined): seg is Locale {
  return seg === 'pl' || seg === 'en'
}

function stripLocale(pathname: string) {
  const seg = pathname.split('/')[1]
  if (isLocale(seg)) {
    const rest = pathname.split('/').slice(2).join('/')
    return '/' + rest
  }
  return pathname
}

function getLocalePrefix(pathname: string) {
  const seg = pathname.split('/')[1]
  return isLocale(seg) ? `/${seg}` : ''
}

function getLocaleFromCookie(req: NextRequest): Locale | null {
  const v = req.cookies.get(LOCALE_COOKIE)?.value
  return isLocale(v) ? v : null
}

function setLocaleCookie(res: NextResponse, locale: Locale) {
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/' })
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const seg = pathname.split('/')[1]
  const hasLocale = isLocale(seg)

  if (!hasLocale) {
    const preferred = getLocaleFromCookie(req) ?? 'pl'
    const url = req.nextUrl.clone()

    if (pathname === '/') {
      url.pathname = `/${preferred}/landing`
    } else {
      url.pathname = `/${preferred}${pathname}`
    }

    const res = NextResponse.redirect(url)
    setLocaleCookie(res, preferred)
    return res
  }

  const locale = seg
  const intlResponse = intlMiddleware(req)
  const location = intlResponse?.headers?.get('location')
  if (location) {
    setLocaleCookie(intlResponse, locale)
    return intlResponse
  }

  const token = await getToken({ req })

  const pathNoLocale = stripLocale(pathname)
  const localePrefix = getLocalePrefix(pathname)

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathNoLocale === p || pathNoLocale.startsWith(p + '/')
  )
  const isPrivate = PRIVATE_PATHS.some(
    (p) => pathNoLocale === p || pathNoLocale.startsWith(p + '/')
  )

  if (token && isPublic) {
    const res = NextResponse.redirect(
      new URL(`${localePrefix}/dashboard`, req.url)
    )
    setLocaleCookie(res, locale)
    return res
  }

  if (!token && isPrivate) {
    const res = NextResponse.redirect(new URL(`${localePrefix}/login`, req.url))
    setLocaleCookie(res, locale)
    return res
  }

  setLocaleCookie(intlResponse, locale)
  return intlResponse
}

export const config = {
  matcher: ['/', '/(pl|en)/:path*', '/((?!_next|_vercel|.*\\..*|api).*)'],
}
