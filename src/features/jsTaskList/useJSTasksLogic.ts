'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export type JavascriptAssignment = {
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
  source?: 'JS' | 'CSS'
  isSolved: boolean
}

type UseTasksLogicResult = {
  tasks: JavascriptAssignment[]
  isLoading: boolean
  isError: boolean
  loadMore: () => void
}

const DEFAULT_LIMIT = 6
const LOAD_MORE_STEP = 3

export const useTasksLogic = (): UseTasksLogicResult => {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT)

  const { data, isLoading, isError } = useQuery<JavascriptAssignment[]>({
    queryKey: ['js-tasks', limit],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set('limit', String(limit))

      const response = await fetch(`/api/js-tasks?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch JS tasks')
      }

      return response.json()
    },
  })

  const loadMore = () => {
    setLimit((prev) => prev + LOAD_MORE_STEP)
  }

  return {
    tasks: data ?? [],
    isLoading,
    isError,
    loadMore,
  }
}
