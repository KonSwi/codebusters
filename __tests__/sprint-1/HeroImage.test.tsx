import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import HeroImage from '@/features/landing/components/HeroImage'

test('HeroImage rendering test', async () => {
  let messages
  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const { getAllByRole, getByRole } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <HeroImage />
    </NextIntlClientProvider>
  )

  const buttons = getAllByRole('button')
  const header = getByRole('heading', { level: 1 })

  expect(
    buttons[0].innerHTML.trim(),
    'Checking if the first button includes the text "Zacznij naukę"'
  ).include('Zacznij naukę')
  expect(
    buttons[1].innerHTML.trim(),
    'Checking if the second button includes the text "Poznaj Akademię"'
  ).include('Poznaj Akademię')

  expect(
    header.innerHTML,
    'Checking if the header includes the text "Codebusters"'
  ).include('Codebusters')
})
