import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'

type ModuleListItem = {
  id: string
  name: string
  description: string
  input: string
  output: string
  difficultyLevel: string
  moduleIndex: number
  sprintsCount: number
  durationHours: number
  progress: number
  sprintProgress: number[]
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
    }),
    prisma.cssAssignment.findMany({
      where: { id: { in: activities } },
      include: {
        solutions: {
          where: { userId },
          select: { result: true },
        },
      },
    }),
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

const mapDifficultyLabel = (level: string): string => {
  if (level === '1' || level === 'EASY') return 'Łatwy'
  if (level === '3' || level === 'HARD') return 'Trudny'
  return 'Średni'
}

export const GET = async () => {
  const session = await getServerSession(authOptions)

  const userId =
    (session?.user as { id?: string | null } | undefined)?.id ?? null

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const modules = await prisma.module.findMany({
      orderBy: { moduleIndex: 'asc' },
      include: {
        sprints: true,
      },
    })

    const result: ModuleListItem[] = await Promise.all(
      modules.map(async (m) => {
        const sprintData = await Promise.all(
          m.sprints.map(async (sprint) => {
            const { solvedCount, totalCount } =
              await calculateSolvedForActivities(sprint.activities, userId)

            const progress =
              totalCount === 0
                ? 0
                : Math.round((solvedCount / totalCount) * 100)

            return {
              solvedCount,
              totalCount,
              progress,
              duration: sprint.duration,
            }
          })
        )

        const totalTasks = sprintData.reduce(
          (sum, item) => sum + item.totalCount,
          0
        )

        const totalSolved = sprintData.reduce(
          (sum, item) => sum + item.solvedCount,
          0
        )

        const durationHours = sprintData.reduce(
          (sum, item) => sum + item.duration,
          0
        )

        const progress =
          totalTasks === 0 ? 0 : Math.round((totalSolved / totalTasks) * 100)

        const sprintProgress = sprintData.map((item) => item.progress)

        const [s1, s2, s3, s4, s5, s6] = [
          sprintProgress[0] ?? 0,
          sprintProgress[1] ?? 0,
          sprintProgress[2] ?? 0,
          sprintProgress[3] ?? 0,
          sprintProgress[4] ?? 0,
          sprintProgress[5] ?? 0,
        ]

        return {
          id: m.id,
          name: m.name,
          description: m.description,
          input: m.input,
          output: m.output,
          difficultyLevel: mapDifficultyLabel(m.difficultyLevel),
          moduleIndex: m.moduleIndex,
          sprintsCount: m.sprints.length,
          durationHours,
          progress,
          sprintProgress: [s1, s2, s3, s4, s5, s6],
        }
      })
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('[GET /api/modules]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
