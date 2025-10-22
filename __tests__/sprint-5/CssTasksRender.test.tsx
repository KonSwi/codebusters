'use client'

import { expect, test, vitest } from 'vitest'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { PrismaClient } from '@prisma/client'

import { TasksList } from '@/components'

import { getTranslation } from '../helpers/translationHelpers'
import { ReactQueryProvider } from '../providers'

const prisma = new PrismaClient()

test('Test checking the functionality of the task list', async () => {
  const messages = await getTranslation()

  vitest.mock('next-auth/react', () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: {
        username: 'admin',
        id: 'clbu9wog100010nnv4j0a5ju5',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'test',
        storedDisplayName: 'test test',
      },
    }
    return {
      __esModule: true,
      useSession: vitest.fn(() => {
        return { data: mockSession, status: 'authenticated' }
      }),
    }
  })

  const tasks = await prisma.cssAssignment.findMany({
    take: Number(2),
  })

  expect(
    tasks,
    'Test checking if it is possible to fetch 2 tasks from the database'
  ).toBeDefined()

  const { getAllByRole } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <ReactQueryProvider>
        <TasksList data={tasks} setLimit={() => {}} />
      </ReactQueryProvider>
    </NextIntlClientProvider>
  )
  const tasksLinks = getAllByRole('link')

  expect(
    tasksLinks,
    'Test checking the rendering of the task list'
  ).toHaveLength(2)
})
