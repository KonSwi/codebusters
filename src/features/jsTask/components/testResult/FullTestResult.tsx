'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import type { FullResults } from '@/features/jsTask/components/tests/testMocks'

import { FullTestCase } from './FullTestCase'

type FullTestResultProps = {
  data: FullResults
}

export const FullTestResult: React.FC<FullTestResultProps> = ({ data }) => {
  const t = useTranslations('signedIn.task.test')

  const total = data.cases.length
  const passedCount = data.cases.filter((c) => c.passed).length
  const allPassed = passedCount === total

  const status = allPassed ? 'passed' : 'failed'

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <p className='text-formErrorFont'>
            {t('resultsWindow.full.summaryTitle', { status })}
          </p>
          <span
            className={clsx('text-articleSmallFont', {
              'text-green': allPassed,
              'text-red': !allPassed,
            })}
          >
            {allPassed ? '✓' : '✕'}
          </span>
        </div>
        <p
          className={clsx('text-formErrorFont', {
            'text-green': allPassed,
            'text-red': !allPassed,
          })}
        >
          {passedCount}/{total}
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        {data.cases.map((tc) => (
          <FullTestCase key={tc.id} testCase={tc} />
        ))}
      </div>
    </div>
  )
}
