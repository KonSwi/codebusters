import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'
import type {
  CssAssignment,
  CssAssignmentSolution,
  JavascriptAssignment,
  JavascriptAssignmentSolution,
} from '@prisma/client'

type SprintDetailsDto = {
  id: string
  moduleId: string | null
  title: string
  shortDescription: string
  longDescription: string
  tasksCount: number
  durationHours: number
  difficultyLabel: string
  progress: number
  activities: string[]
}

const mapDifficultyLabel = (level: string): string => {
  if (level === '1') return 'Łatwy'
  if (level === '3') return 'Trudny'
  return 'Średni'
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

const calculateSolvedForActivities = async (
  activities: string[],
  userId: string
) => {
  if (activities.length === 0) {
    return { solvedCount: 0, totalCount: 0 }
  }

  const [jsAssignments, cssAssignments] = await Promise.all([
    prisma.javascriptAssignment.findMany({
      where: { id: { in: activities } },
      include: {
        solutions: {
          where: { userId },
          select: { solution: true },
        },
      },
    }) as Promise<JsAssignmentWithSolutions[]>,
    prisma.cssAssignment.findMany({
      where: { id: { in: activities } },
      include: {
        solutions: {
          where: { userId },
          select: { result: true },
        },
      },
    }) as Promise<CssAssignmentWithSolutions[]>,
  ])

  const totalCount = activities.length
  let solvedCount = 0

  jsAssignments.forEach((assignment) => {
    const hasSolution = assignment.solutions.length > 0

    if (!hasSolution) {
      return
    }

    const raw = assignment.solutions[0]?.solution?.[0]

    if (isJsStoredSolution(raw) && raw.allPassed === true) {
      solvedCount += 1
    }
  })

  cssAssignments.forEach((assignment) => {
    const isSolved = assignment.solutions.some(
      (solution) => solution.result >= assignment.requirements
    )

    if (isSolved) {
      solvedCount += 1
    }
  })

  return { solvedCount, totalCount }
}

export const GET = async (
  _request: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const session = await getServerSession(authOptions)

  const userId =
    session?.user && 'id' in session.user && typeof session.user.id === 'string'
      ? session.user.id
      : null

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const safeUserId = userId

  const { id } = await context.params

  try {
    const sprint = await prisma.sprint.findUnique({
      where: { id },
    })

    if (!sprint) {
      return NextResponse.json({ message: 'Sprint not found' }, { status: 404 })
    }

    const { solvedCount, totalCount } = await calculateSolvedForActivities(
      sprint.activities,
      safeUserId
    )

    const progress =
      totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100)

    const result: SprintDetailsDto = {
      id: sprint.id,
      moduleId: sprint.moduleId ?? null,
      title: sprint.name,
      shortDescription: sprint.shortDescription,
      longDescription: sprint.longDescription,
      tasksCount: totalCount,
      durationHours: sprint.duration,
      difficultyLabel: mapDifficultyLabel(sprint.difficultyLevel),
      progress,
      activities: sprint.activities,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[GET /api/sprints/[id]]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
