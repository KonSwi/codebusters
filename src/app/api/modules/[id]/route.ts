import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'
import type {
  CssAssignment,
  CssAssignmentSolution,
  JavascriptAssignment,
  JavascriptAssignmentSolution,
  Module as ModuleModel,
  Sprint,
  Technology,
} from '@prisma/client'

type ModuleTechnologyDto = {
  id: string
  name: string
  description: string
}

type ModuleSprintItemDto = {
  id: string
  title: string
  description: string
  tasksCount: number
  durationHours: number
  difficultyLabel: string
  progress: number
  imageSrc: string
}

type ModuleDetailsDto = {
  id: string
  title: string
  description: string
  input: string
  output: string
  sprintsCount: number
  tasksCount: number
  difficultyLabel: string
  durationHours: number
  progress: number
  videoId: string
  technologies: ModuleTechnologyDto[]
  sprints: ModuleSprintItemDto[]
}

type ModuleWithRelations = ModuleModel & {
  sprints: (Sprint & { technologies: Technology[] })[]
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
    (session?.user as { id?: string | null } | undefined)?.id ?? null

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const safeUserId = userId

  const { id } = await context.params

  try {
    const moduleEntity: ModuleWithRelations | null =
      await prisma.module.findUnique({
        where: { id },
        include: {
          sprints: {
            include: {
              technologies: true,
            },
            orderBy: {
              sprintNumber: 'asc',
            },
          },
        },
      })

    if (!moduleEntity) {
      return NextResponse.json({ message: 'Module not found' }, { status: 404 })
    }

    const allTechnologies: Technology[] = moduleEntity.sprints.flatMap(
      (sprint) => sprint.technologies
    )

    const uniqueTechnologiesMap = new Map<string, ModuleTechnologyDto>()

    allTechnologies.forEach((tech) => {
      if (!uniqueTechnologiesMap.has(tech.id)) {
        uniqueTechnologiesMap.set(tech.id, {
          id: tech.id,
          name: tech.name,
          description: tech.description,
        })
      }
    })

    const technologies = Array.from(uniqueTechnologiesMap.values())

    const sprintProgressData = await Promise.all(
      moduleEntity.sprints.map(async (sprint) => {
        const { solvedCount, totalCount } = await calculateSolvedForActivities(
          sprint.activities,
          safeUserId
        )

        const progress =
          totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100)

        return {
          sprint,
          solvedCount,
          totalCount,
          progress,
        }
      })
    )

    const sprints: ModuleSprintItemDto[] = sprintProgressData.map(
      ({ sprint, totalCount, progress }) => ({
        id: sprint.id,
        title: sprint.name,
        description: sprint.longDescription || sprint.shortDescription,
        tasksCount: totalCount,
        durationHours: sprint.duration,
        difficultyLabel: mapDifficultyLabel(sprint.difficultyLevel),
        progress,
        imageSrc: '/hero/heroImage.jpg',
      })
    )

    const totalTasks = sprintProgressData.reduce(
      (sum, item) => sum + item.totalCount,
      0
    )

    const totalSolved = sprintProgressData.reduce(
      (sum, item) => sum + item.solvedCount,
      0
    )

    const durationHours = moduleEntity.sprints.reduce(
      (sum, sprint) => sum + sprint.duration,
      0
    )

    const moduleProgress =
      totalTasks === 0 ? 0 : Math.round((totalSolved / totalTasks) * 100)

    const result: ModuleDetailsDto = {
      id: moduleEntity.id,
      title: moduleEntity.name,
      description: moduleEntity.description,
      input: moduleEntity.input,
      output: moduleEntity.output,
      sprintsCount: moduleEntity.sprints.length,
      tasksCount: totalTasks,
      difficultyLabel: mapDifficultyLabel(moduleEntity.difficultyLevel),
      durationHours,
      progress: moduleProgress,
      videoId: moduleEntity.moduleVideo,
      technologies,
      sprints,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[GET /api/modules/[id]]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
