import * as vm from 'node:vm'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prismadb'

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const segments = url.pathname.split('/').filter(Boolean)

  const taskId = segments[segments.length - 2]
  const userId = segments[segments.length - 1]

  if (!taskId || !userId) {
    return NextResponse.json(
      { message: 'taskId and userId are required' },
      { status: 400 }
    )
  }

  try {
    const assignment = await prisma.javascriptAssignment.findUnique({
      where: { id: taskId },
      include: {
        solutions: {
          where: { userId },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json(assignment)
  } catch (error) {
    console.error('[GET /api/js-tasks/[...id]]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

type JsTaskRunBody = {
  solution: string
  variant: 'solution' | 'test' | 'quickTest'
  quickTest?: unknown
}

type AssignmentTest = {
  input: unknown[]
  output: unknown
}

const runSolution = (code: string, args: unknown[]): unknown => {
  const context: Record<string, unknown> = {}

  vm.createContext(context)
  vm.runInContext(code, context)

  const solutionFn = Object.values(context).find(
    (value): value is (...fnArgs: unknown[]) => unknown =>
      typeof value === 'function'
  )

  if (!solutionFn) {
    throw new Error('No function found in provided code')
  }

  return solutionFn(...(args ?? []))
}

const deepEqual = (a: unknown, b: unknown): boolean => {
  return JSON.stringify(a) === JSON.stringify(b)
}

const isAssignmentTest = (value: unknown): value is AssignmentTest =>
  typeof value === 'object' &&
  value !== null &&
  'input' in value &&
  'output' in value

export const PUT = async (request: Request) => {
  const url = new URL(request.url)
  const segments = url.pathname.split('/').filter(Boolean)

  const taskId = segments[segments.length - 2]
  const userId = segments[segments.length - 1]

  if (!taskId || !userId) {
    return NextResponse.json(
      { message: 'taskId and userId are required' },
      { status: 400 }
    )
  }

  let body: JsTaskRunBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const { solution, variant } = body

  if (!solution || !variant) {
    return NextResponse.json(
      { message: 'solution and variant are required' },
      { status: 400 }
    )
  }

  try {
    const assignment = await prisma.javascriptAssignment.findUnique({
      where: { id: taskId },
      include: {
        solutions: {
          where: { userId },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    const rawTests = assignment.tests

    if (!Array.isArray(rawTests) || rawTests.length === 0) {
      return NextResponse.json({ message: 'No tests defined' }, { status: 400 })
    }

    const tests = rawTests

    let testsToRun: unknown[] = []

    if (variant === 'quickTest') {
      testsToRun = [tests[0]]
    } else if (variant === 'test') {
      testsToRun = tests.slice(0, 3)
    } else if (variant === 'solution') {
      testsToRun = tests
    }

    const results: {
      input: unknown[]
      expectedResult: unknown
      codeOutcome: unknown
      testOutcome: boolean
      error?: string
    }[] = []

    for (const candidate of testsToRun) {
      if (!isAssignmentTest(candidate)) {
        continue
      }

      const t = candidate

      let expectedResult: unknown

      try {
        expectedResult = runSolution(assignment.patternFunction, t.input)
      } catch {
        const raw = t.output

        if (typeof raw === 'string') {
          try {
            expectedResult = JSON.parse(raw)
          } catch {
            expectedResult = raw
          }
        } else {
          expectedResult = raw
        }
      }

      try {
        const codeOutcome = runSolution(solution, t.input)
        const testOutcome = deepEqual(expectedResult, codeOutcome)

        results.push({
          input: t.input,
          expectedResult,
          codeOutcome,
          testOutcome,
        })
      } catch (error) {
        results.push({
          input: t.input,
          expectedResult,
          codeOutcome: null,
          testOutcome: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    const allPassed = results.every((r) => r.testOutcome)

    if (variant === 'solution' && allPassed) {
      await prisma.javascriptAssignment.update({
        where: { id: taskId },
        data: {
          submissions: {
            increment: 1,
          },
        },
      })

      await prisma.javascriptAssignmentSolution.upsert({
        where: {
          javascriptAssignmentId_userId: {
            javascriptAssignmentId: taskId,
            userId,
          },
        },
        update: {
          solution: [solution],
        },
        create: {
          javascriptAssignmentId: taskId,
          userId,
          solution: [solution],
        },
      })
    }

    return NextResponse.json({
      ok: true,
      tests: results,
      allPassed,
    })
  } catch (error) {
    console.error('[PUT /api/js-tasks/[...id]]', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
