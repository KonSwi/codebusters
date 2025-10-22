import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import Footer from '@/features/signOutLayout/components/Footer'

test('Footer test', async () => {
  let messages
  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const { getAllByRole } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Footer />
    </NextIntlClientProvider>
  )

  const links = getAllByRole('link')

  expect(
    links[0].getAttribute('href'),
    'Checking if the first link href is correct'
  ).toBe('https://devstock.pl')
  expect(
    links[0].children[0].innerHTML,
    'Checking if the first link text is correct'
  ).toBe('Devstock.pl')

  expect(
    links[1].getAttribute('href'),
    'Checking if the second link href is correct'
  ).toBe('/')
  expect(
    links[1].children[0].innerHTML,
    'Checking if the second link text is correct'
  ).toBe('Polityka prywatności')

  expect(
    links[2].getAttribute('href'),
    'Checking if the third link href is correct'
  ).toBe('/')
  expect(
    links[2].children[0].innerHTML,
    'Checking if the third link text is correct'
  ).toBe('Kontakt')
})
