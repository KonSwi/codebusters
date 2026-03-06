'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export type JavascriptAssignmentResponse = {
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
}

export type JsTaskResultFromApi = {
  input: unknown[]
  expectedResult: unknown
  codeOutcome: unknown
  testOutcome: boolean
  error?: string
}

export type JsTaskRunResponse = {
  ok: boolean
  tests: JsTaskResultFromApi[]
  allPassed: boolean
}

const fetchTask = async (
  taskId: string,
  userId: string
): Promise<JavascriptAssignmentResponse> => {
  const res = await fetch(`/api/js-tasks/${taskId}/${userId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch js task')
  }

  return res.json()
}

const runJsTask = async (params: {
  taskId: string
  userId: string
  solution: string
  variant: 'solution' | 'test' | 'quickTest'
  quickTest?: unknown
}): Promise<JsTaskRunResponse> => {
  const { taskId, userId, solution, variant, quickTest } = params

  const res = await fetch(`/api/js-tasks/${taskId}/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      solution,
      variant,
      quickTest,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to run js task')
  }

  return res.json()
}

export const useTask = (taskId?: string) => {
  const { data: session } = useSession()

  let userId: string | undefined

  if (
    session?.user &&
    typeof session.user === 'object' &&
    'id' in session.user
  ) {
    const value = (session.user as { id: unknown }).id

    if (typeof value === 'string') {
      userId = value
    }
  }

  return useQuery<JavascriptAssignmentResponse>({
    queryKey: ['js-task', taskId, userId],
    queryFn: () => {
      if (!taskId || !userId) {
        throw new Error('Missing taskId or userId')
      }

      return fetchTask(taskId, userId)
    },
    enabled: Boolean(taskId && userId),
  })
}

type RunJsTaskVariables = {
  solution: string
  variant: 'solution' | 'test' | 'quickTest'
  quickTest?: unknown
}

export const useRunJsTask = (taskId?: string) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  let userId: string | undefined

  if (
    session?.user &&
    typeof session.user === 'object' &&
    'id' in session.user
  ) {
    const value = (session.user as { id: unknown }).id

    if (typeof value === 'string') {
      userId = value
    }
  }

  return useMutation<JsTaskRunResponse, Error, RunJsTaskVariables>({
    mutationFn: async (variables) => {
      if (!taskId || !userId) {
        throw new Error('Missing taskId or userId')
      }

      return runJsTask({
        taskId,
        userId,
        solution: variables.solution,
        variant: variables.variant,
        quickTest: variables.quickTest,
      })
    },
    onSuccess: (data, variables) => {
      if (variables.variant === 'solution' && data.allPassed) {
        queryClient.invalidateQueries({ queryKey: ['js-task'] })
        queryClient.invalidateQueries({ queryKey: ['js-tasks'] })
        queryClient.invalidateQueries({ queryKey: ['activities'] })
      }
    },
  })
}
