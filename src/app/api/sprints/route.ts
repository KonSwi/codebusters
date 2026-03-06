import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'

type SprintListItemDto = {
  id: string
  moduleId: string | null
  title: string
  shortDescription: string
  tasksCount: number
  durationHours: number
  difficultyLabel: string
  progress: number
}

const mapDifficultyLabel = (level: string): string => {
  if (level === '1') return 'Łatwy'
  if (level === '3') return 'Trudny'
  return 'Średni'
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
      select: { id: true },
    }),
    prisma.cssAssignment.findMany({
      where: { id: { in: activities } },
      select: { id: true },
    }),
  ])

  const jsIds = jsAssignments.map((a) => a.id)
  const cssIds = cssAssignments.map((a) => a.id)

  const [jsSolutions, cssSolutions] = await Promise.all([
    jsIds.length
      ? prisma.javascriptAssignmentSolution.findMany({
          where: {
            javascriptAssignmentId: { in: jsIds },
            userId,
          },
          select: { javascriptAssignmentId: true },
        })
      : Promise.resolve([]),
    cssIds.length
      ? prisma.cssAssignmentSolution.findMany({
          where: {
            CssAssignmentId: { in: cssIds },
            userId,
          },
          include: { cssAssignment: true },
        })
      : Promise.resolve([]),
  ])

  const jsSolvedIds = new Set(jsSolutions.map((s) => s.javascriptAssignmentId))

  const cssSolvedIds = new Set(
    cssSolutions
      .filter(
        (s) =>
          s.cssAssignment &&
          typeof s.result === 'number' &&
          s.result >= s.cssAssignment.requirements
      )
      .map((s) => s.CssAssignmentId)
  )

  const solvedCount = jsSolvedIds.size + cssSolvedIds.size

  return { solvedCount, totalCount: activities.length }
}

export const GET = async () => {
  const session = await getServerSession(authOptions)

  const userId =
    (session?.user as { id?: string | null } | undefined)?.id ?? null

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const safeUserId = userId

  try {
    const sprints = await prisma.sprint.findMany({
      orderBy: { sprintNumber: 'asc' },
    })

    const result: SprintListItemDto[] = await Promise.all(
      sprints.map(async (sprint) => {
        const { solvedCount, totalCount } = await calculateSolvedForActivities(
          sprint.activities,
          safeUserId
        )

        const progress =
          totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100)

        return {
          id: sprint.id,
          moduleId: sprint.moduleId ?? null,
          title: sprint.name,
          shortDescription: sprint.shortDescription,
          tasksCount: totalCount,
          durationHours: sprint.duration,
          difficultyLabel: mapDifficultyLabel(sprint.difficultyLevel),
          progress,
        }
      })
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('[GET /api/sprints]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
