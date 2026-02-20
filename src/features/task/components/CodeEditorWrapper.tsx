'use client'

import { useTranslations } from 'next-intl'

import { Button, Modal } from '@/components'
import { useCodeEditor } from '@/context'
import { RunIcon, SubmitIcon } from '@/icons'

import { CodeEditor } from './CodeEditor'

const CodeEditorWrapper = () => {
  const {
    code,
    setCode,
    isModalOpen,
    setIsModalOpen,
    result,
    setResult,
    runCode,
  } = useCodeEditor()

  const handleRun = () => {
    runCode()
  }

  const handleSubmit = () => {
    const next = result === 'success' ? 'error' : 'success'
    setResult(next)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const modalVariant = result ?? 'error'

  const isSuccess = modalVariant === 'success'

  const status = isSuccess ? 'success' : 'fail'

  const t = useTranslations('signedIn.task.editor')

  return (
    <div className='flex h-full min-h-0 w-full flex-col overflow-hidden'>
      <div className='min-h-0 flex-1 overflow-hidden'>
        <CodeEditor value={code} onChange={setCode} />
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
