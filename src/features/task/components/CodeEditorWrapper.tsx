'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Button, Modal } from '@/components'
import { useCodeEditor } from '@/context'
import { RunIcon, SubmitIcon } from '@/icons'

import { CodeEditor } from './CodeEditor'
import { useRunJsTask } from '../hooks/useTask'

type CodeEditorWrapperProps = {
  taskId: string
}

const CodeEditorWrapper: React.FC<CodeEditorWrapperProps> = ({ taskId }) => {
  const {
    code,
    setCode,
    isModalOpen,
    setIsModalOpen,
    result,
    setResult,
    runCode,
  } = useCodeEditor()

  const [hasEditorErrors, setHasEditorErrors] = React.useState<boolean>(false)

  const t = useTranslations('signedIn.task.editor')
  const runJsTaskMutation = useRunJsTask(taskId)

  const isRunning = runJsTaskMutation.isPending

  const handleRun = () => {
    runCode()
  }

  const isFunctionLike = (source: string) =>
    /function\s+[a-zA-Z0-9_$]+\s*\(/.test(source)

  const handleSubmit = async () => {
    const trimmedCode = code.trim()

    if (!trimmedCode || !isFunctionLike(trimmedCode) || hasEditorErrors) {
      setResult('error')
      setIsModalOpen(true)
      return
    }

    try {
      const response = await runJsTaskMutation.mutateAsync({
        solution: trimmedCode,
        variant: 'solution',
      })

      setResult(response.allPassed ? 'success' : 'error')
      setIsModalOpen(true)
    } catch (error) {
      console.error(error)
      setResult('error')
      setIsModalOpen(true)
    }
  }

  const closeModal = () => setIsModalOpen(false)

  const modalVariant = result ?? 'error'
  const isSuccess = modalVariant === 'success'
  const status = isSuccess ? 'success' : 'fail'

  return (
    <div className='flex h-full min-h-0 w-full flex-col overflow-hidden'>
      <div className='min-h-0 flex-1 overflow-hidden'>
        <CodeEditor
          value={code}
          onChange={setCode}
          onValidate={setHasEditorErrors}
        />
      </div>
      <div className='bg-grayLightTask h-15 flex items-center gap-4 px-4'>
        <Button
          type='button'
          variant='success'
          onClick={handleRun}
          className='flex-1 gap-2'
        >
          {t('button.runCode')}
          <RunIcon className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          variant='blue'
          onClick={handleSubmit}
          className='flex-1 gap-2'
          disabled={isRunning}
        >
          {t('button.sendSolution')}
          <SubmitIcon className='h-4 w-4' />
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        variant={modalVariant}
        title={t('modal.title', { status })}
        description={t('modal.description', { status })}
        buttonLabel={t('modal.buttonLabel', { status })}
      />
    </div>
  )
}

export default CodeEditorWrapper
