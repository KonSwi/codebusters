'use client'

import React from 'react'

import type { AnyResults } from './testMocks'
import { QuickTestResult } from './QuickTestResult'
import { FullTestResult } from './FullTestResult'

type TestResultsProps = {
  results: AnyResults | null
}

export const TestResults: React.FC<TestResultsProps> = ({ results }) => {
  if (!results) {
    return <div className='h-full w-full' />
  }

  if (results.kind === 'quick') {
    return <QuickTestResult data={results} />
  }

  return <FullTestResult data={results} />
}
