'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'
import { useCodeEditor } from '@/context'
import { useRunJsTask } from '@/features/jsTask/components/useTask'

import { TestsContent } from './TestsContent'
import type { AnyResults, FullResults, QuickResults } from './testMocks'

export type TestsProps = {
  activeTab: 'tests' | 'quick'
  onRun: (results: AnyResults) => void
  tests: unknown[]
  taskId: string
}

export const Tests: React.FC<TestsProps> = ({
  activeTab,
  onRun,
  tests,
  taskId,
}) => {
  const [quickInput, setQuickInput] = React.useState<string>(
    '["a","b","c",1,2,3]'
  )

  const t = useTranslations('signedIn.task.test')
  const { code, setConsoleLines } = useCodeEditor()
  const runJsTaskMutation = useRunJsTask(taskId)

  const isRunning = runJsTaskMutation.isPending

  const pushConsoleError = (message: string) => {
    const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setConsoleLines((prev) => [
      ...prev,
      { id: makeId(), type: 'error', message },
    ])
  }

  const isFunctionLike = (source: string) =>
    /function\s+[a-zA-Z0-9_$]+\s*\(/.test(source)

  const handleRun = async (forceVariant?: 'solution') => {
    const trimmedCode = code.trim()

    if (!trimmedCode) {
      pushConsoleError(
        'Kod nie może być pusty. Wprowadź funkcję do przetestowania.'
      )
      return
    }

    if (!isFunctionLike(trimmedCode)) {
      pushConsoleError(
        'Wysyłany kod musi być funkcją (np. function solution(input) { ... }).'
      )
      return
    }

    const variant =
      forceVariant ?? (activeTab === 'quick' ? 'quickTest' : 'test')

    try {
      const response = await runJsTaskMutation.mutateAsync({
        solution: trimmedCode,
        variant,
        quickTest: quickInput,
      })

      if (variant === 'quickTest') {
        const first = response.tests[0]

        const quickResult: QuickResults = {
          kind: 'quick',
          expectedResult: JSON.stringify(first.expectedResult),
          yourResult: first.error
            ? `Błąd: ${first.error}`
            : JSON.stringify(first.codeOutcome),
          passed: first.testOutcome,
        }

        onRun(quickResult)
        return
      }

      const fullResult: FullResults = {
        kind: 'full',
        cases: response.tests.map((t, index) => ({
          id: String(index + 1),
          inputData: JSON.stringify(t.input, null, 2),
          expectedResult: JSON.stringify(t.expectedResult),
          yourResult: t.error
            ? `Błąd: ${t.error}`
            : JSON.stringify(t.codeOutcome),
          passed: t.testOutcome,
        })),
      }

      onRun(fullResult)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nie udało się uruchomić testów.'
      pushConsoleError(message)
      console.error(error)
    }
  }

  const mode = activeTab === 'quick' ? 'quick' : 'tests'

  return (
    <div>
      <div className='flex h-full min-h-0 flex-col items-center gap-4'>
        <Button
          variant='orange'
          onClick={() => handleRun()}
          className='mb-4 w-full'
          disabled={isRunning}
        >
          {t('testsWindow.runButtonLabel', { mode })}
        </Button>
      </div>
      <div className='min-h-0 flex-1 overflow-y-auto p-0'>
        <TestsContent
          activeTab={activeTab}
          quickInput={quickInput}
          onQuickInputChange={setQuickInput}
          tests={tests}
        />
      </div>
    </div>
  )
}
