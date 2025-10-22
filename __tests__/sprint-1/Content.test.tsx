import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import Content from '@/features/landing/components/Content'

type PageContentProps = {
  pageContent: {
    firstParagraph: string
    secondParagraph: string
  }
}

test('Content rendering test', async () => {
  let messages

  const contentProps: PageContentProps = {
    pageContent: {
      firstParagraph:
        'Codebusters pozwoli Ci poznawać i w praktyce ćwiczyć technologie Front-end, takie jak HTML5, CSS oraz JavaScript!',
      secondParagraph:
        'Możesz rozwiązywać zadania, piąć się w rankingu, zdobywać osiagnięcia i poziomy znajomości różnych technologii, a nawet wyeksportować swoje wyniki i pochwalić się nimi!',
    },
  }
  const {
    firstParagraph: firstParagraphProp,
    secondParagraph: secondParagraphProp,
  } = contentProps.pageContent

  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const { getByRole, getByText, rerender } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Content {...contentProps} />
    </NextIntlClientProvider>
  )

  let firstParagraph = getByText(firstParagraphProp)
  let secondParagraph = getByText(secondParagraphProp)
  const heading = getByRole('heading', { level: 1 })
  const link = getByRole('link')

  expect(
    firstParagraph.innerHTML.trim(),
    'Checking if the first paragraph renders correctly'
  ).toBe(firstParagraphProp)
  expect(
    secondParagraph.innerHTML.trim(),
    'Checking if the second paragraph renders correctly'
  ).toBe(secondParagraphProp)
  expect(
    heading.innerHTML,
    'Checking if the heading includes the correct text'
  ).include('Czego możesz się nauczyć')
  expect(
    link.innerHTML,
    'Checking if the link includes the correct text'
  ).include('Poznaj nas')

  const updatedContentProps: PageContentProps = {
    pageContent: {
      firstParagraph: 'Testowa zmiana pierwszego paragrafu',
      secondParagraph: 'Testowa zmiana drugiego paragrafu',
    },
  }
  const {
    firstParagraph: updatedFirstParagraphProp,
    secondParagraph: updatedSecondParagraphProp,
  } = updatedContentProps.pageContent

  rerender(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Content {...updatedContentProps} />
    </NextIntlClientProvider>
  )

  firstParagraph = getByText(updatedFirstParagraphProp)
  secondParagraph = getByText(updatedSecondParagraphProp)

  expect(
    firstParagraph.innerHTML.trim(),
    'Checking if the updated first paragraph renders correctly'
  ).toBe(updatedFirstParagraphProp)
  expect(
    secondParagraph.innerHTML.trim(),
    'Checking if the updated second paragraph renders correctly'
  ).toBe(updatedSecondParagraphProp)
})
