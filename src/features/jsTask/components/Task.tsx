'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { CodeEditorProvider } from '@/context'
import { SidebarIconPicker } from '@/features/signInLayout/components/SidebarIconPicker'
import { Button } from '@/components'
import { Tests } from '@/features/jsTask/components/tests/Tests'
import { TestResults } from '@/features/jsTask/components/testResult/TestResult'
import { Editor } from '@/features/jsTask/components/editor/Editor'
import { TaskPanel } from '@/features/jsTask/components/TestWrapper'
import type { AnyResults } from '@/features/jsTask/components/tests/testMocks'
import { useTask } from '@/features/jsTask/components/useTask'
import Timer from '@/components/timer/Timer'

import Description, { type TaskDescriptionData } from './Description'
import { Console } from './Console'

type TestsTab = 'tests' | 'quick'

export const Task = () => {
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false)
  const [testsTab, setTestsTab] = React.useState<TestsTab>('tests')
  const [results, setResults] = React.useState<AnyResults | null>(null)

  const t = useTranslations('signedIn.task')
  const params = useParams<{ id?: string }>()
  const rawId = params?.id
  const taskId = Array.isArray(rawId) ? rawId[0] : rawId

  const { data: assignment } = useTask(taskId)

  if (!taskId || !assignment) {
    return null
  }

  const difficultyLabel = t('description.difficultyLabel', {
    difficulty: assignment.difficultyLevel,
  })

  const descriptionData: TaskDescriptionData = {
    category: assignment.category,
    solvedCount: assignment.submissions ?? 0,
    difficulty: difficultyLabel,
    title: assignment.name,
    description: assignment.descriptionEnd
      ? `${assignment.descriptionStart}\n\n${assignment.descriptionEnd}`
      : assignment.descriptionStart,
    sampleInput: assignment.sampleInput.join('\n'),
    sampleOutput: assignment.sampleOutput.join('\n'),
  }

  const firstThreeTests = assignment.tests.slice(0, 3)

  return (
    <CodeEditorProvider>
      <div className='flex h-full min-h-0 w-full flex-col gap-5 overflow-hidden pb-6 font-medium'>
        <div className='bg-gray flex shrink-0 items-center justify-between rounded-lg px-4 '>
          <div className='flex items-center'>
            <Button type='button' variant='ghost'>
              {t('topBar.prev')}
            </Button>
            <span>|</span>
            <Button type='button' variant='ghost'>
              {t('topBar.next')}
            </Button>
            <span>|</span>
            <Timer />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='icon'
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={t('topBar.ariaFullscreen')}
            >
              <svg
                className='h-5 w-5'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  d='M17 17H13M1 5V1V5ZM1 1H5H1ZM1 1L6 6L1 1ZM17 5V1V5ZM17 1H13H17ZM17 1L12 6L17 1ZM1 13V17V13ZM1 17H5H1ZM1 17L6 12L1 17ZM17 17L12 12L17 17ZM17 17V13V17Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
            <Button
              type='button'
              variant='icon'
              aria-label={t('topBar.ariaSettings')}
            >
              <SidebarIconPicker name='settings' className='h-5 w-5' />
            </Button>
          </div>
        </div>
        <div
          className={clsx('flex min-h-0 flex-1 overflow-hidden', {
            'gap-0': isFullscreen,
            'gap-8': !isFullscreen,
          })}
        >
          <div
            className={clsx(
              'flex min-h-0 flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out',
              {
                'pointer-events-none w-0 opacity-0': isFullscreen,
                'flex-1 opacity-100': !isFullscreen,
              }
            )}
          >
            <div className='min-h-0 flex-1 overflow-hidden'>
              <TaskPanel
                tabs={[{ id: 'description', label: t('panels.description') }]}
                activeTabId='description'
              >
                <Description data={descriptionData} />
              </TaskPanel>
            </div>
            <div className='min-h-0 flex-1 overflow-hidden'>
              <TaskPanel
                tabs={[
                  { id: 'tests', label: t('panels.tests') },
                  { id: 'quick', label: t('panels.quickTests') },
                ]}
                activeTabId={testsTab}
                onTabChange={(id) => {
                  if (id === testsTab) return
                  setTestsTab(id === 'quick' ? 'quick' : 'tests')
                }}
              >
                <Tests
                  activeTab={testsTab}
                  onRun={setResults}
                  tests={firstThreeTests}
                  taskId={assignment.id}
                />
              </TaskPanel>
            </div>
            <div className='min-h-0 flex-1 overflow-hidden'>
              <TaskPanel
                tabs={[{ id: 'results', label: t('panels.results') }]}
                activeTabId='results'
                contentClassName='p-0'
              >
                <TestResults results={results} />
              </TaskPanel>
            </div>
          </div>
          <div
            className={clsx(
              'flex min-h-0 flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out',
              {
                'flex-1': isFullscreen,
                'flex-2': !isFullscreen,
              }
            )}
          >
            <div className='min-h-0 flex-1 overflow-hidden'>
              <TaskPanel
                tabs={[{ id: 'editor', label: t('panels.editor') }]}
                activeTabId='editor'
                className='h-full'
                contentClassName='p-0'
              >
                <Editor taskId={assignment.id} />
              </TaskPanel>
            </div>
            <div className='min-h-24 max-h-40 overflow-hidden'>
              <TaskPanel
                tabs={[{ id: 'console', label: t('panels.console') }]}
                activeTabId='console'
                className='h-full'
              >
                <Console />
              </TaskPanel>
            </div>
          </div>
        </div>
      </div>
    </CodeEditorProvider>
  )
}
