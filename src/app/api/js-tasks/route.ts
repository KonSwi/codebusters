import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib'
import { authOptions } from '@/lib/authOptions'

type JsAssignmentWithUserSolutions = {
  id: string
  name: string
  category: 'FUNCTION' | 'LOOP'
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD'
  submissions: number | null
  descriptionStart: string
  descriptionEnd: string | null
  sampleInput: string[]
  sampleOutput: string[]
  tests: unknown[]
  patternFunction: string
  solutions: { id: string }[]
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  const userId =
    (session?.user as { id?: string | null } | undefined)?.id ?? null

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get('limit')

  const take =
    limitParam !== null &&
    !Number.isNaN(Number.parseInt(limitParam, 10)) &&
    Number.parseInt(limitParam, 10) > 0
      ? Number.parseInt(limitParam, 10)
      : undefined

  const assignments = (await prisma.javascriptAssignment.findMany({
    take,
    orderBy: { name: 'asc' },
    include: {
      solutions: {
        where: { userId },
        select: { id: true },
      },
    },
  })) as JsAssignmentWithUserSolutions[]

  const tasks = assignments.map((assignment) => ({
    id: assignment.id,
    name: assignment.name,
    category: assignment.category,
    difficultyLevel: assignment.difficultyLevel,
    submissions: assignment.submissions,
    descriptionStart: assignment.descriptionStart,
    descriptionEnd: assignment.descriptionEnd,
    sampleInput: assignment.sampleInput,
    sampleOutput: assignment.sampleOutput,
    tests: assignment.tests,
    patternFunction: assignment.patternFunction,
    isSolved: assignment.solutions.length > 0,
  }))

  return NextResponse.json(tasks)
}
