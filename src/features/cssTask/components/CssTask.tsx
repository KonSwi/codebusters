'use client'

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'
import Timer from '@/components/timer/Timer'
import { TaskDescription } from '@/components/TaskDescription'
import { BackIcon, HelpIcon, DownloadIcon, LevelIcon } from '@/icons'

import { ContentWrapper } from './ContentWrapper'
import { Grid } from './Grid'
import { Editor } from './Editor'
import { ScoreModal } from './ScoreModal'
import { submitCssSolution, useCssTask } from './useCssTask'
import { OutputView } from './OutputView'
import { TargetView } from './TargetView'

type LeftTabKey = 'description' | 'editor'

export const CssTask = () => {
  const [activeTab, setActiveTab] = React.useState<LeftTabKey>('description')
  const [editorValue, setEditorValue] = React.useState<string>('')
  const [score, setScore] = React.useState<number | null>(null)
  const [isChecking, setIsChecking] = React.useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [isScoreModalOpen, setIsScoreModalOpen] = React.useState<boolean>(false)

  const { id: rawId } = useParams<{ id?: string | string[] }>()
  const router = useRouter()

  const t = useTranslations('signedIn.cssTask')

  const id =
    typeof rawId === 'string'
      ? rawId
      : Array.isArray(rawId) && rawId.length > 0
      ? rawId[0]
      : null

  const { data, isLoading, isError } = useCssTask(id)

  React.useEffect(() => {
    if (!isLoading && !isError && data?.initialCode) {
      setEditorValue(data.initialCode)
    }
  }, [data?.initialCode, isLoading, isError])

  const title = data?.title ?? t('placeholders.descriptionTitle')
  const descriptionText = data?.description ?? t('placeholders.descriptionBody')

  const requiredScore = 95

  const handleCheck = async () => {
    if (!id || !editorValue.trim()) return

    setIsChecking(true)
    try {
      const { matchPercent } = await submitCssSolution({
        taskId: id,
        solution: editorValue,
      })
      setScore(matchPercent)
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async () => {
    if (!id || !editorValue.trim()) return

    setIsSubmitting(true)
    try {
      const { matchPercent } = await submitCssSolution({
        taskId: id,
        solution: editorValue,
      })
      setScore(matchPercent)
      setIsScoreModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasScore = score !== null
  const isPassed = hasScore && score >= requiredScore

  return (
    <ContentWrapper>
      <div className='flex w-full flex-col font-medium'>
        <div className='bg-gray flex shrink-0 items-center justify-between rounded-lg px-4'>
          <div className='flex items-center'>
            <Button
              type='button'
              variant='ghost'
              onClick={() => router.back()}
              className='flex items-center gap-2 px-4 py-2 text-sm font-medium'
            >
              <BackIcon className='h-5 w-5' />
              <span>{t('panels.back')}</span>
            </Button>
            <Timer />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              onClick={() => {}}
              className='flex'
              aria-label={t('toolbar.downloadAria')}
            >
              <DownloadIcon className='h-5 w-5' />
            </Button>
            <Button
              type='button'
              variant='ghost'
              onClick={() => {}}
              className='flex'
              aria-label={t('toolbar.helpAria')}
            >
              <HelpIcon className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
      <div className='flex min-h-0 min-w-0 flex-1 rounded-lg'>
        <Grid
          left={
            <div className='bg-gray flex h-full min-h-0 flex-col overflow-hidden rounded-lg'>
              <div className='border-b-codeBorder flex shrink-0 border-b'>
                <Button
                  type='button'
                  onClick={() => setActiveTab('description')}
                  className={clsx(
                    'text-formErrorFont h-9 shrink-0 rounded-none px-4 font-medium',
                    {
                      'bg-blue shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]':
                        activeTab === 'description',
                      'bg-blueOff': activeTab !== 'description',
                    }
                  )}
                >
                  {t('panels.description')}
                </Button>
                <Button
                  type='button'
                  onClick={() => setActiveTab('editor')}
                  className={clsx(
                    'text-formErrorFont h-9 shrink-0 rounded-none px-4 font-medium',
                    {
                      'bg-blue shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]':
                        activeTab === 'editor',
                      'bg-blueOff': activeTab !== 'editor',
                    }
                  )}
                >
                  {t('panels.editor')}
                </Button>
              </div>
              <div className='flex-1 overflow-auto rounded-b-lg'>
                {activeTab === 'description' && (
                  <div className='p-4'>
                    <TaskDescription
                      icon={
                        <Image
                          src='/icons/CSS3.svg'
                          priority
                          width={30}
                          height={30}
                          alt='CSS3'
                        />
                      }
                      meta={
                        <div className='flex items-center gap-2'>
                          <div className='mx-2 w-3 shrink-0 rotate-90 border-t-2' />
                          <LevelIcon className='h-5 w-5' />
                          <div className='mx-2 w-3 shrink-0 rotate-90 border-t-2' />
                          <span>{t('meta.completedStatic')}</span>
                        </div>
                      }
                      title={title}
                      titleClassName='text-[#F5A22E]'
                      description={descriptionText}
                      gap='8'
                    />
                  </div>
                )}
                {activeTab === 'editor' && (
                  <div className='h-full w-full min-w-0'>
                    {isLoading && (
                      <div className='flex h-full items-center justify-center text-xs text-neutral-300'>
                        {t('editor.loading')}
                      </div>
                    )}
                    {isError && !isLoading && (
                      <div className='flex h-full items-center justify-center text-xs text-red-400'>
                        {t('editor.error')}
                      </div>
                    )}
                    {!isLoading && !isError && data && (
                      <Editor value={editorValue} onChange={setEditorValue} />
                    )}
                  </div>
                )}
              </div>
            </div>
          }
          middle={
            <OutputView
              editorValue={editorValue}
              targetImageUrl={data?.targetImageUrl ?? null}
              score={score}
              requiredScore={requiredScore}
              isChecking={isChecking}
              isSubmitting={isSubmitting}
              onCheck={handleCheck}
              onSubmit={handleSubmit}
            />
          }
          right={<TargetView targetImageUrl={data?.targetImageUrl ?? null} />}
        />
      </div>
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        title={
          <span className='text-titleSmallFont mt-2'>
            {t('output.result.title')}
          </span>
        }
        description={
          hasScore ? (
            <div className='inline-flex rounded border border-current px-6 py-2 text-xl font-semibold'>
              {t('output.result.percent', { value: score })}
            </div>
          ) : undefined
        }
        buttonLabel={t('output.result.button')}
        variant={isPassed ? 'success' : 'error'}
      />
    </ContentWrapper>
  )
}

export default CssTask
