'use client'

import { expect, test } from 'vitest'
import uuid from 'react-uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = {
  id: uuid(),
  name: 'test_user',
  email: `test@test${uuid()}.com`,
}

test('Test checking the database connection', async () => {
  try {
    await prisma.user.create({ data: userData })
    const fetchedUser = await prisma.user.findUnique({
      where: { id: userData.id },
    })
    expect(
      fetchedUser,
      'Fetched user should be defined after being created in the database'
    ).toBeDefined()
  } catch (error) {
    console.error('Test failed:', error)
    throw error
  } finally {
    const user = await prisma.user.findUnique({ where: { id: userData.id } })
    if (user) {
      await prisma.user.delete({ where: { id: userData.id } })
    }
  }
})
