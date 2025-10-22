import React from 'react'
import { render } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { vi, test, expect } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

import { Kanban } from '@/features/kanban'

import { getTranslation } from '../helpers/translationHelpers'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('@/features/modules/components/useModulesLogic', () => ({
  __esModule: true,
  default: () => ({
    fetchModulesTasks: vi.fn(),
  }),
}))

const mockKanbanData = [
  {
    id: '1',
    name: 'Task 1',
    category: 'Category 1',
    difficultyLevel: 'Easy',
    reviewStatus: 'inProgress',
    description: 'Description 1',
  },
  {
    id: '2',
    name: 'Task 2',
    category: 'Category 2',
    difficultyLevel: 'Medium',
    reviewStatus: 'review',
    description: 'Description 2',
  },
]

test('renders kanban board with tasks', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useQuery.mockReturnValue({
    data: mockKanbanData,
    isLoading: false,
  })

  const { getAllByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Kanban activities={['1', '2']} />
    </NextIntlClientProvider>
  )

  const columns = getAllByTestId('columns')
  expect(
    columns,
    'there are three columns: "to do", "progress", "done"'
  ).toHaveLength(3)

  const tasks = getAllByTestId('tasks')
  expect(tasks, 'Tasks shoud be rendered').toHaveLength(mockKanbanData.length)
})
