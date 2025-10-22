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
const taskData = {
  id: uuid(),
  name: 'Sum array',
  descriptionStart: 'Napisz funkcję, która sumuje wszystkie liczby w tablicy.',
  descriptionEnd: 'Zakładamy, że tablica zawiera tylko liczby.',
  patternFunction:
    'function sumArray(input) { return input.reduce((acc, curr) => acc + curr, 0);}',
  sampleInput: ['[1, 2, 3]'],
  sampleOutput: ['6'],
  tests: [
    { input: [[4, 5, 6]], output: 15 },
    { input: [[10, 20, 30]], output: 60 },
    { input: [[0, 0, 0]], output: 0 },
    { input: [[-1, -2, -3]], output: -6 },
    { input: [[1, -1, 1, -1]], output: 0 },
    { input: [[2, 4, 6, 8]], output: 20 },
    { input: [[3, 3, 3]], output: 9 },
    { input: [[10, 5, 0, -5, -10]], output: 0 },
  ],
}
const taskSolutionData = {
  id: uuid(),
  solution: [],
  userId: userData.id,
  javascriptAssignmentId: taskData.id,
}

test('Test checking the database connection', async () => {
  try {
    await prisma.user.create({ data: userData })
    await prisma.javascriptAssignment.create({ data: taskData as any })

    const data = await prisma.javascriptAssignment.findUnique({
      where: { id: taskData.id },
    })
    expect(
      data,
      'Test checking if a JS task can be created and retrieved from the database'
    ).toBeDefined()

    await prisma.javascriptAssignmentSolution.create({
      data: taskSolutionData,
    })

    const solution = await prisma.javascriptAssignmentSolution.findUnique({
      where: { id: taskSolutionData.id },
    })
    expect(
      solution,
      'Test checking if a JS task solution can be created and retrieved from the database'
    ).toBeDefined()
  } catch (error) {
    console.error('Test failed:', error)
    throw error
  } finally {
    const solution = await prisma.javascriptAssignmentSolution.findUnique({
      where: { id: taskSolutionData.id },
    })
    if (solution) {
      await prisma.javascriptAssignmentSolution.delete({
        where: { id: taskSolutionData.id },
      })
    }

    const data = await prisma.javascriptAssignment.findUnique({
      where: { id: taskData.id },
    })
    if (data) {
      await prisma.javascriptAssignment.delete({ where: { id: taskData.id } })
    }

    const user = await prisma.user.findUnique({ where: { id: userData.id } })
    if (user) {
      await prisma.user.delete({ where: { id: userData.id } })
    }
  }
})
