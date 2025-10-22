import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { beforeEach, expect, test } from 'vitest'
import { notFound } from 'next/navigation'

import CodeEditorWrapper from '@/features/task/components/CodeEditorWrapper'
import { CodeEditorProvider } from '@/context'

beforeEach(async () => {
  let messages
  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <CodeEditorProvider>
        <CodeEditorWrapper />
      </CodeEditorProvider>
    </NextIntlClientProvider>
  )
})

test('Integration and configuration of Monaco editor', () => {
  expect(screen.getByTestId('editor'), 'Editor should be rendered').toBeTruthy()
  expect(
    screen.getByText('Uruchom kod'),
    'Run Code button should be rendered'
  ).toBeTruthy()
  expect(
    screen.getByText('Wyślij rozwiązanie'),
    'Submit Solution button should be rendered'
  ).toBeTruthy()
})
