import React from 'react'
import { render } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { vi, test, expect } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

import { TasksList } from '@/features/task'

import { getTranslation } from '../helpers/translationHelpers'

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('./useTasksLogic', () => ({
  __esModule: true,
  default: () => ({
    fetchTasks: vi.fn(),
  }),
}))

const mockTasks = [
  {
    id: '1',
    name: 'Task 1',
    category: 'Category 1',
    difficultyLevel: 'Easy',
    descriptionEnd: 'Description End 1',
    descriptionStart: 'Description Start 1',
    sampleInput: ['Input 1'],
    sampleOutput: ['Output 1'],
    submissions: 5,
    tests: [],
    solutions: [
      {
        userId: 'user1',
        solution: [
          {
            isPassed: true,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Task 2',
    category: 'Category 2',
    difficultyLevel: 'Medium',
    descriptionEnd: 'Description End 2',
    descriptionStart: 'Description Start 2',
    sampleInput: ['Input 2'],
    sampleOutput: ['Output 2'],
    submissions: 10,
    tests: [],
    solutions: [
      {
        userId: 'user2',
        solution: [
          {
            isPassed: false,
          },
        ],
      },
    ],
  },
]

test('renders tasks', async () => {
  const messages = await getTranslation()

  // @ts-ignore
  useSession.mockReturnValue({
    data: { user: { id: 'user1' } },
    status: 'authenticated',
  })

  // @ts-ignore
  useQuery.mockReturnValue({
    data: mockTasks,
    isLoading: false,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <TasksList />
    </NextIntlClientProvider>
  )

  const container = getByTestId('tasks-lists-container')
  expect(container?.children, 'Checking rendering of tasks').toHaveLength(
    mockTasks.length
  )
})

test('shows loading state', async () => {
  const messages = await getTranslation()

  // @ts-ignore
  useQuery.mockReturnValue({
    data: [],
    isLoading: true,
  })

  const { getByText } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <TasksList />
    </NextIntlClientProvider>
  )

  expect(
    getByText('Loading...'),
    'Loading state should be displayed'
  ).toBeDefined()
})
