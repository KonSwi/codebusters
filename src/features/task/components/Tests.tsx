'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'

import { TestsContent } from './TestsContent'
import type { AnyResults } from './testMocks'
import { buildMockQuickResult, mockFullTestCases } from './testMocks'

export type TestsProps = {
  activeTab: 'tests' | 'quick'
  onRun: (results: AnyResults) => void
}

export const Tests: React.FC<TestsProps> = ({ activeTab, onRun }) => {
  const [quickInput, setQuickInput] = React.useState<string>(
    '["a","b","c",1,2,3]'
  )

  const t = useTranslations('signedIn.task.test')

  const handleRun = () => {
    if (activeTab === 'quick') {
      onRun(buildMockQuickResult(quickInput))
      return
    }

    onRun({
      kind: 'full',
      cases: mockFullTestCases,
    })
  }

  const mode = activeTab === 'quick' ? 'quick' : 'tests'

  return (
    <div>
      <div className='flex h-full min-h-0 flex-col items-center gap-4'>
        <Button variant='orange' onClick={handleRun} className='mb-4 w-full'>
          {t('testsWindow.runButtonLabel', { mode })}
        </Button>
      </div>
      <div className='min-h-0 flex-1 overflow-y-auto p-0'>
        <TestsContent
          activeTab={activeTab}
          quickInput={quickInput}
          onQuickInputChange={setQuickInput}
        />
      </div>
    </div>
  )
}
