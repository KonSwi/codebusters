'use client'

import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

export type ModuleTechnology = {
  id: string
  name: string
  description: string
}

export type ModuleSprintItem = {
  id: string
  title: string
  description: string
  tasksCount: number
  durationHours: number
  difficultyLabel: string
  progress: number
  imageSrc: string
}

export type ModuleDetails = {
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
  technologies: ModuleTechnology[]
  sprints: ModuleSprintItem[]
}

type ModuleDetailsApi = {
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
  technologies: ModuleTechnology[]
  sprints: ModuleSprintItem[]
}

type UseModuleResult = {
  module: ModuleDetails | null
  isLoading: boolean
  isError: boolean
}

const mapApiModuleToModule = (api: ModuleDetailsApi): ModuleDetails => {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    input: api.input,
    output: api.output,
    sprintsCount: api.sprintsCount,
    tasksCount: api.tasksCount,
    difficultyLabel: api.difficultyLabel,
    durationHours: api.durationHours,
    progress: api.progress,
    videoId: api.videoId,
    technologies: api.technologies,
    sprints: api.sprints,
  }
}

export const useModule = (): UseModuleResult => {
  const { moduleId } = useParams<{ moduleId: string }>()

  const { data, isLoading, isError } = useQuery<ModuleDetailsApi>({
    queryKey: ['module', moduleId],
    queryFn: async () => {
      if (!moduleId) {
        throw new Error('Missing moduleId')
      }

      const res = await fetch(`/api/modules/${moduleId}`)

      if (!res.ok) {
        throw new Error('Failed to fetch module')
      }

      return res.json()
    },
    enabled: Boolean(moduleId),
  })

  const moduleData = data ? mapApiModuleToModule(data) : null

  return {
    module: moduleData,
    isLoading,
    isError,
  }
}
