'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { Button } from '@/components'

import { CodeBlock } from './CodeBlock'
import type { TestCase } from './testMocks'

type FullTestCaseProps = {
  testCase: TestCase
}

export const FullTestCase: React.FC<FullTestCaseProps> = ({ testCase }) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const t = useTranslations('signedIn.task.test')

  const status = testCase.passed ? 'passed' : 'failed'

  return (
    <div className='rounded-lg'>
      <Button
        variant='testResult'
        onClick={() => setOpen((prev) => !prev)}
        className={clsx('relative z-10', {
          'border-green': testCase.passed,
          'border-red': !testCase.passed,
        })}
      >
        <div className='flex-1 min-w-0'>
        <span className='text-formErrorFont h-5.5'>
          {t('resultsWindow.full.caseTitle', {
            id: testCase.id,
            status,
          })}
        </span>
        </div>
        <svg
          className={clsx('h-5 w-5 transition-transform', {
            'rotate-180': open,
          })}
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M6 9l6 6 6-6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
      {open && (
        <div
          className={clsx(
            'bg-grayLightTask relative z-0 -mt-2 rounded-b-lg border px-4 pb-4 pt-4 shadow-[0_0_10px_rgba(0,0,0,0.35)]',
            {
              'border-green': testCase.passed,
              'border-red': !testCase.passed,
            }
          )}
        >
          <div className='flex flex-col gap-4'>
            <div className='text-formErrorFont flex flex-col'>
              <p>{t('resultsWindow.expectedResultLabel')}</p>
              <CodeBlock value={testCase.expectedResult} className='h-6' />
            </div>
            <div className='text-formErrorFont flex flex-col'>
              <p>{t('resultsWindow.yourResultLabel')}</p>
              <CodeBlock value={testCase.yourResult} className='h-6' />
            </div>
            <div className='text-formErrorFont flex flex-col'>
              <p>{t('resultsWindow.inputDataLabel')}</p>
              <CodeBlock value={testCase.inputData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
