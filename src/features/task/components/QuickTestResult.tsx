'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { CodeBlock } from './CodeBlock'
import type { QuickResults } from './testMocks'

type QuickTestResultProps = {
  data: QuickResults
}

export const QuickTestResult: React.FC<QuickTestResultProps> = ({ data }) => {
  const t = useTranslations('signedIn.task.test')

  const isPassed = data.passed

  const status = isPassed ? 'passed' : 'failed'

  return (
    <div
      className={clsx('h-full w-full overflow-hidden rounded-b-lg border', {
        'border-green': isPassed,
        'border-red': !isPassed,
      })}
    >
      <div className='flex h-full min-h-0 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <p className='text-formErrorFont'>
            {t('resultsWindow.quick.title', { status })}
          </p>
        </div>
        <div className='flex min-h-0 flex-col gap-4'>
          <div className='flex flex-col'>
            <p className='text-formErrorFont'>
              {t('resultsWindow.expectedResultLabel')}
            </p>
            <CodeBlock value={data.expectedResult} className='h-6' />
          </div>
          <div className='flex flex-col'>
            <p className='text-formErrorFont'>
              {t('resultsWindow.yourResultLabel')}
            </p>
            <CodeBlock value={data.yourResult} className='h-6' />
          </div>
        </div>
      </div>
    </div>
  )
}
