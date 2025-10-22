'use client'

import { expect, test } from 'vitest'
import uuid from 'react-uuid'
import { PrismaClient } from '@prisma/client'

import { countMatch } from '@/app/api/css-tasks/[...id]/route'

const prisma = new PrismaClient()

const userData = {
  id: uuid(),
  name: 'test_user',
  email: `test@test${uuid()}.com`,
}
const taskData = {
  id: uuid(),
  difficultyLevel: 'MEDIUM',
  name: 'Test task',
  description:
    'Laboris aute et dolore quis do pariatur ut minim Lorem officia eiusmod aute eiusmod fugiat.Labore voluptate commodo magna eu pariatur dolore labore voluptate magna commodo mollit veniam proident.Officia cillum voluptate sint consequat quis irure.Magna proident ipsum ullamco laborum dolor aliquip aute.Cillum tempor anim non ut pariatur irure quis nisi proident et anim anim.',
  colors: ['#97CC7E'],
  targetUrl:
    'http://res.cloudinary.com/pokersun/image/upload/v1678961467/learning-platform/images/6412eb3b1a8514503d1fc681-image-1678961467.png',
  requirements: 95,
}
const taskSolutionData = {
  id: uuid(),
  solution: `<div class="box"></div><style>.box{height:120px;width:120px;box-sizing-border-box;border: 20px solid #97CC7E;border-radius: 50%;position: relative;left: 50%;top: 50%;transform: translate(-50%, -50%);}.box:before{content: ' ';position: absolute;left:50%;top:-40px;transform: translate(-50%, 0);width: 40px;background: #97CC7E;border: 10px solid #fff;border-radius: 50px;height: 105px;box-sizing: border-box;}</style>`,
  userId: userData.id,
  CssAssignmentId: taskData.id,
}

test('Test checking the database connection', async () => {
  try {
    await prisma.user.create({ data: userData })
    await prisma.cssAssignment.create({ data: taskData as any })

    const data = await prisma.cssAssignment.findUnique({
      where: { id: taskData.id },
    })
    expect(
      data,
      'Test checking if a CSS task can be created and retrieved from the database'
    ).toBeDefined()

    const result = await countMatch(
      taskData.targetUrl,
      taskSolutionData.solution
    )
    expect(
      result,
      'Test verifying the correctness of the logic for calculating compliance'
    ).toBe(100)

    await prisma.cssAssignmentSolution.create({ data: taskSolutionData })

    const solution = await prisma.cssAssignmentSolution.findUnique({
      where: { id: taskSolutionData.id },
    })
    expect(
      solution,
      'Test checking if a VSS task solution can be created and retrieved from the database'
    ).toBeDefined()
  } catch (error) {
    console.error('Test failed:', error)
    throw error
  } finally {
    const solution = await prisma.cssAssignmentSolution.findUnique({
      where: { id: taskSolutionData.id },
    })
    if (solution) {
      await prisma.cssAssignmentSolution.delete({
        where: { id: taskSolutionData.id },
      })
    }

    const data = await prisma.cssAssignment.findUnique({
      where: { id: taskData.id },
    })
    if (data) {
      await prisma.cssAssignment.delete({ where: { id: taskData.id } })
    }

    const user = await prisma.user.findUnique({ where: { id: userData.id } })
    if (user) {
      await prisma.user.delete({ where: { id: userData.id } })
    }
  }
})
