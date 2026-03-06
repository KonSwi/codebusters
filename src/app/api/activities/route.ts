import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import type {
  CssAssignment,
  CssAssignmentSolution,
  DifficultyLevel,
  JavascriptAssignment,
  JavascriptAssignmentSolution,
} from '@prisma/client'
import { prisma } from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'

type ActivityDto = {
  id: string
  source: 'JS' | 'CSS'
  title: string
  description: string
  difficultyLevel: DifficultyLevel
  hasSolution: boolean
  isSolved: boolean
}

type JsAssignmentWithSolutions = JavascriptAssignment & {
  solutions: Pick<JavascriptAssignmentSolution, 'solution'>[]
}

type CssAssignmentWithSolutions = CssAssignment & {
  solutions: Pick<CssAssignmentSolution, 'result'>[]
}

type JsStoredSolution = {
  allPassed?: unknown
  code?: unknown
}

const isJsStoredSolution = (value: unknown): value is JsStoredSolution => {
  return typeof value === 'object' && value !== null && 'allPassed' in value
}

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)

  const userId =
    (session?.user as { id?: string | null } | undefined)?.id ?? null

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const idsParam = searchParams.get('ids')

  if (!idsParam) {
    return NextResponse.json(
      { message: 'Missing ids query parameter' },
      { status: 400 }
    )
  }

  const ids = idsParam
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  if (ids.length === 0) {
    return NextResponse.json<ActivityDto[]>([])
  }

  try {
    const jsAssignments = (await prisma.javascriptAssignment.findMany({
      where: { id: { in: ids } },
      include: {
        solutions: {
          where: { userId },
          select: { solution: true },
        },
      },
    })) as JsAssignmentWithSolutions[]

    const cssAssignments = (await prisma.cssAssignment.findMany({
      where: { id: { in: ids } },
      include: {
        solutions: {
          where: { userId },
          select: { result: true },
        },
      },
    })) as CssAssignmentWithSolutions[]

    const activities: ActivityDto[] = []

    jsAssignments.forEach((assignment) => {
      const hasSolution = assignment.solutions.length > 0

      let isSolved = false

      if (hasSolution) {
        const raw = assignment.solutions[0]?.solution?.[0]

        if (isJsStoredSolution(raw) && raw.allPassed === true) {
          isSolved = true
        }
      }

      activities.push({
        id: assignment.id,
        source: 'JS',
        title: assignment.name,
        description: assignment.descriptionStart,
        difficultyLevel: assignment.difficultyLevel,
        hasSolution,
        isSolved,
      })
    })

    cssAssignments.forEach((assignment) => {
      const hasSolution = assignment.solutions.length > 0
      const isSolved = assignment.solutions.some(
        (solution) => solution.result >= assignment.requirements
      )

      activities.push({
        id: assignment.id,
        source: 'CSS',
        title: assignment.name,
        description: assignment.description,
        difficultyLevel: assignment.difficultyLevel,
        hasSolution,
        isSolved,
      })
    })

    return NextResponse.json<ActivityDto[]>(activities)
  } catch (error) {
    console.error('[GET /api/activities]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
