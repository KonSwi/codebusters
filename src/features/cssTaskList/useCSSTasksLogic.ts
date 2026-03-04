'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export type CssTask = {
  id: string
  title: string
  description: string
}

type UseCssTasksLogicResult = {
  tasks: CssTask[]
  isLoading: boolean
  isError: boolean
  loadMore: () => void
}

const DEFAULT_LIMIT = 6
const LOAD_MORE_STEP = 3

export const useCSSTasksLogic = (): UseCssTasksLogicResult => {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT)

  const { data, isLoading, isError } = useQuery<CssTask[]>({
    queryKey: ['css-tasks', limit],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set('limit', String(limit))

      const response = await fetch(`/api/css-tasks?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch CSS tasks')
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
