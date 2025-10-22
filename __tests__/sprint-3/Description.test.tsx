import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { expect, test } from 'vitest'

import Description from '@/features/task/components/Description'

type MockedTask = {
  category: string
  howManyPassed: number
  difficulty: 'easy' | 'normal' | 'hard'
  title: string
  description: string
  sampleInput?: string[]
  sampleOutput?: string[]
}

const initialTask: MockedTask = {
  category: 'JS',
  howManyPassed: 4,
  difficulty: 'easy',
  title: 'Sample JS Task',
  description: 'This is a sample JS task description.',
  sampleInput: ['array = [2,3,4,5];', 'const data = 3;'],
  sampleOutput: ['[2, 3, 4, 5, 2, 3, 4, 5]'],
}

const updatedTask: MockedTask = {
  category: 'CSS',
  howManyPassed: 6,
  difficulty: 'hard',
  title: 'Sample CSS Task',
  description: 'This is a sample CSS task description.',
  sampleInput: ['array = [2,3,4];', 'const data = 1;'],
  sampleOutput: ['[2, 3, 4, 2, 3, 4]'],
}

const noSampleTask: MockedTask = {
  category: 'CSS',
  howManyPassed: 6,
  difficulty: 'hard',
  title: 'Sample CSS Task',
  description: 'This is a sample CSS task description.',
  sampleInput: undefined,
  sampleOutput: undefined,
}

test('Content rendering test', async () => {
  let messages
  try {
    messages = (await import('../../messages/pl.json')).default
  } catch (error) {
    notFound()
  }

  const component = (task: MockedTask) => (
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Description task={task} />
    </NextIntlClientProvider>
  )

  const { getByText, queryByText, rerender } = render(component(initialTask))

  expect(
    getByText(`Kategoria: ${initialTask.category}`),
    'Category should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText(`Wykonane ${initialTask.howManyPassed} razy`),
    'How many passed should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText('Stopień: łatwy'),
    'Difficulty level should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText(initialTask.title),
    'Title should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText(initialTask.description),
    'Description should be rendered correctly'
  ).toBeTruthy()

  initialTask.sampleInput?.forEach((input) => {
    expect(
      getByText(input),
      `Sample input "${input}" should be rendered correctly`
    ).toBeTruthy()
  })

  initialTask.sampleOutput?.forEach((output) => {
    expect(
      getByText(output),
      `Sample output "${output}" should be rendered correctly`
    ).toBeTruthy()
  })

  rerender(component(updatedTask))

  expect(
    getByText(`Kategoria: ${updatedTask.category}`),
    'Updated category should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText(`Wykonane ${updatedTask.howManyPassed} razy`),
    'Updated how many passed should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText('Stopień: trudny'),
    'Updated difficulty level should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText(updatedTask.title),
    'Updated title should be rendered correctly'
  ).toBeTruthy()
  expect(
    getByText(updatedTask.description),
    'Updated description should be rendered correctly'
  ).toBeTruthy()

  updatedTask.sampleInput?.forEach((input) => {
    expect(
      getByText(input),
      `Updated sample input "${input}" should be rendered correctly`
    ).toBeTruthy()
  })

  updatedTask.sampleOutput?.forEach((output) => {
    expect(
      getByText(output),
      `Updated sample output "${output}" should be rendered correctly`
    ).toBeTruthy()
  })

  rerender(component(noSampleTask))

  expect(
    queryByText('Dane wejściowe'),
    'Sample input header should not be rendered'
  ).toBeNull()
  expect(
    queryByText('Dane wyjściowe'),
    'Sample output header should not be rendered'
  ).toBeNull()
})
