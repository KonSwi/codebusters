import React from 'react'
import { render } from '@testing-library/react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { vi, test, expect } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

import { Sprint } from '@/features/sprint'

import { getTranslation } from '../helpers/translationHelpers'

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('./useSprint', () => ({
  __esModule: true,
  default: () => ({
    fetchSprint: vi.fn(),
  }),
}))

const mockSprintData = {
  name: 'Sprint 1',
  duration: '2 weeks',
  progress: 50,
  activities: [
    { id: '1', title: 'Activity 1' },
    { id: '2', title: 'Activity 2' },
  ],
  difficultyLevel: 'Medium',
  shortDescription: 'This is a sprint',
}

test('renders sprint data', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useParams.mockReturnValue({ sprintId: 'sprint-1' })

  // @ts-ignore
  useQuery.mockReturnValue({
    data: mockSprintData,
    isLoading: false,
    isError: false,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Sprint />
    </NextIntlClientProvider>
  )

  // Sprawdzenie, czy dane sprintu są renderowane
  const sprintContainer = getByTestId('sprint-container')
  expect(sprintContainer, 'Sprint container should be rendered').toBeDefined()
  expect(sprintContainer.children, 'Sprint should be rendered').toBeDefined()
})

test('shows loading state', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useParams.mockReturnValue({ sprintId: 'sprint-1' })

  // @ts-ignore
  useQuery.mockReturnValue({
    data: null,
    isLoading: true,
    isError: false,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Sprint />
    </NextIntlClientProvider>
  )

  expect(
    getByTestId('loader'),
    'Loading state should be displayed'
  ).toBeDefined()
})

test('shows error state', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useParams.mockReturnValue({ sprintId: 'sprint-1' })

  // @ts-ignore
  useQuery.mockReturnValue({
    data: null,
    isLoading: false,
    isError: true,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Sprint />
    </NextIntlClientProvider>
  )

  expect(
    getByTestId('sprint-error'),
    'Error state should be displayed'
  ).toBeDefined()
})
