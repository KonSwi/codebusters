'use client'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export type CssTaskData = {
  id: string
  title: string
  description: string
  targetImageUrl: string
  initialCode: string
}

export type UseCssTaskResult = UseQueryResult<CssTaskData, Error>

const fetchCssTask = async (id: string): Promise<CssTaskData> => {
  const response = await fetch(`/api/css-tasks/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch css task')
  }

  return response.json()
}

export const useCssTask = (id: string | null): UseCssTaskResult => {
  return useQuery<CssTaskData>({
    queryKey: ['css-task', id],
    enabled: Boolean(id),
    queryFn: () => {
      if (!id) {
        throw new Error('Missing css task id')
      }

      return fetchCssTask(id)
    },
  })
}

type SubmitCssSolutionParams = {
  taskId: string
  solution: string
}

export type SubmitCssSolutionResponse = {
  taskId: string
  matchPercent: number
}

export const submitCssSolution = async ({
  taskId,
  solution,
}: SubmitCssSolutionParams): Promise<SubmitCssSolutionResponse> => {
  const response = await fetch(`/api/css-tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId, solution }),
  })

  if (!response.ok) {
    throw new Error('Failed to submit css solution')
  }

  return response.json()
}
