'use client'

import { useQuery } from '@tanstack/react-query'

export type SprintFromApi = {
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

const fetchSprint = async (sprintId: string): Promise<SprintFromApi> => {
  const res = await fetch(`/api/sprints/${sprintId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch sprint')
  }

  return res.json()
}

export const useSprint = (sprintId?: string) => {
  return useQuery<SprintFromApi>({
    queryKey: ['sprint', sprintId],
    queryFn: () => {
      if (!sprintId) {
        throw new Error('Missing sprintId')
      }

      return fetchSprint(sprintId)
    },
    enabled: Boolean(sprintId),
  })
}