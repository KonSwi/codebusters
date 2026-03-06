'use client'

import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'

export type Module = {
  id: string
  title: string
  input: string
  output: string
  sprintsCount: number
  difficulty: string
  durationHours: number
  progress: number
  sprint1: number
  sprint2: number
  sprint3: number
  sprint4: number
  sprint5: number
  sprint6: number
}

type ModuleFromApi = {
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

type UseModulesLogicResult = {
  modules: Module[]
  isLoading: boolean
  isError: boolean
}

export const useModulesLogic = (): UseModulesLogicResult => {
  const t = useTranslations('signedIn.module')

  const mapDifficultyLabel = (level: string): string => {
    if (level === '1' || level === 'EASY') return t('difficulty.easy')
    if (level === '3' || level === 'HARD') return t('difficulty.hard')
    return t('difficulty.medium')
  }

  const { data, isLoading, isError } = useQuery<ModuleFromApi[]>({
    queryKey: ['modules'],
    queryFn: async () => {
      const res = await fetch('/api/modules')

      if (!res.ok) {
        throw new Error('Failed to fetch modules')
      }

      return res.json()
    },
  })

  const modules: Module[] =
    data?.map((m) => {
      const sprintProgress = m.sprintProgress ?? []
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
        title: m.name,
        input: m.input,
        output: m.output,
        sprintsCount: m.sprintsCount,
        difficulty: mapDifficultyLabel(m.difficultyLevel),
        durationHours: m.durationHours,
        progress: m.progress,
        sprint1: s1,
        sprint2: s2,
        sprint3: s3,
        sprint4: s4,
        sprint5: s5,
        sprint6: s6,
      }
    }) ?? []

  return { modules, isLoading, isError }
}
