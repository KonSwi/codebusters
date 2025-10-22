import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { expect, test, vi } from 'vitest'

import Landing from '@/features/landing/components/Landing'

type ContentProps = {
  pageContent: {
    firstParagraph: string
    secondParagraph: string
  }
}

vi.mock('@/features/landing/components/HeroImage', () => ({
  default: () => <div>Mocked HeroImage</div>,
}))

vi.mock('@/features/landing/components/Content', () => ({
  default: ({ pageContent }: ContentProps) => (
    <div>
      <p>Mocked Content</p>
      <p>{pageContent.firstParagraph}</p>
      <p>{pageContent.secondParagraph}</p>
    </div>
  ),
}))

test('Landing rendering test', async () => {
  let messages

  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const { getByText } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Landing />
    </NextIntlClientProvider>
  )

  const heroImage = getByText('Mocked HeroImage')
  const content = getByText('Mocked Content')

  const translatedText =
    'Codebusters pozwoli Ci poznawać i w praktyce ćwiczyć technologie Front-end, takie jak HTML5, CSS oraz JavaScript!'

  expect(
    getByText(translatedText),
    'Checking if the translated text is rendered correctly'
  ).toBeTruthy()
  expect(
    heroImage,
    'Checking if the mocked HeroImage is rendered correctly'
  ).toBeTruthy()
  expect(
    content,
    'Checking if the mocked Content is rendered correctly'
  ).toBeTruthy()
})
