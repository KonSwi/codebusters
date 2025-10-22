import React from 'react'
import { render } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { vi, test, expect } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

import { Modules } from '@/features/modules'

import { getTranslation } from '../helpers/translationHelpers'

// Mock useQuery from react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

// Mock useModulesLogic hook
vi.mock('./useModulesLogic', () => ({
  __esModule: true,
  default: () => ({
    fetchModules: vi.fn(),
  }),
}))

const mockModules = [
  {
    id: 'clogwts3a022740v8aucxg3id',
    moduleIndex: 1,
    name: 'Podstawy programowania',
    difficultyLevel: '1',
    description:
      'W tym module kursu będziesz zgłębiać podstawy nauk komputerowych oraz języka JavaScript. Rozpoczynamy od zrozumienia działania internetu, poprzez algorytmy i struktury danych, a kończąc na zaawansowanych technikach programowania w JS. Kurs skupia się na praktycznych aspektach, wprowadzając uczestników w świat front-endu. Sześć sprintów zapewnia stopniowe i zorganizowane przyswajanie wiedzy',
    moduleVideo: 'fBGhBP476zE',
    input:
      'Żeby przystąpić do tego modułu nie potrzebujesz żadnej wiedzy z zakresu programowania',
    output:
      'Po zakończeniu modułu będziesz posiadać wiedzę z zakresu podstaw tworzenia algorytmów, HTML, CSS oraz podstaw JavaScript',
  },
  {
    id: 'clogwts3a022741v8aucxg3ie',
    moduleIndex: 2,
    name: 'Biblioteka React.js o obiegówka',
    difficultyLevel: '2',
    description:
      'W tym module kursu zagłębiasz się w fundamenty biblioteki React oraz jej ekosystemu. Począwszy od zrozumienia podstaw JSX, poprzez stan komponentu i cykl życia, a kończąc na technikach zarządzania stanem aplikacji. Kurs koncentruje się na rzeczywistych zastosowaniach React, przygotowując uczestników do tworzenia nowoczesnych aplikacji webowych. Sześć sprintów gwarantuje metodyczne i strukturalne przyswajanie kluczowych koncepcji React.',
    moduleVideo: 'fBGhBP476zE',
    input:
      'Żeby przystąpić do tego modułu musisz znać HTML, CSS oraz podstawy języka JavaScript',
    output:
      'Po zakończonym module poznasz: podstawy biblioteki React oraz zobaczysz cały proces powstawania oprogramowania',
  },
]

test('renders modules', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useQuery.mockReturnValue({
    data: mockModules,
    isLoading: false,
    isError: false,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Modules />
    </NextIntlClientProvider>
  )

  const moduleContainer = getByTestId('module-container')
  expect(moduleContainer.children, 'Rendering Modules test').toHaveLength(
    mockModules.length
  )
})

test('shows loading state', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useQuery.mockReturnValue({
    data: [],
    isLoading: true,
    isError: false,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Modules />
    </NextIntlClientProvider>
  )

  expect(
    getByTestId('loader'),
    'Loading state should be displayed'
  ).toBeDefined()
})

test('shows error state', async () => {
  const messages = await getTranslation()
  // @ts-ignore
  useQuery.mockReturnValue({
    data: [],
    isLoading: false,
    isError: true,
  })

  const { getByTestId } = render(
    <NextIntlClientProvider locale='pl' messages={messages}>
      <Modules />
    </NextIntlClientProvider>
  )

  expect(
    getByTestId('modules-error'),
    'Error state should be displayed'
  ).toBeDefined()
})
