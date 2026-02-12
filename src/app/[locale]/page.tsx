import { redirect } from 'next/navigation'

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: 'pl' | 'en' }>
}) {
  const { locale } = await params
  redirect(`/${locale}/landing`)
}
