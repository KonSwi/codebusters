import React from 'react'
import { useTranslations } from 'next-intl'
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from 'react-compare-slider'
import DOMPurify from 'dompurify'

import { Button } from '@/components'
import { RunIcon, SubmitIcon } from '@/icons'

import { Switch } from './Switch'
import { OutputImage } from './OutputImage'

type OutputViewProps = {
  editorValue: string
  resultImageUrl?: string | null
  targetImageUrl?: string | null
  score: number | null
  requiredScore: number
  isChecking: boolean
  isSubmitting: boolean
  onCheck: () => void
  onSubmit: () => void
}

type IframePreviewProps = {
  html: string
}

const innerHTMLSanitizer = (frame: HTMLIFrameElement | null, value: string) => {
  if (!frame) return
  const doc = frame.contentDocument
  if (!doc) return

  const divElement = doc.documentElement
  divElement.innerHTML = DOMPurify.sanitize(value, {
    FORCE_BODY: true,
  })
}

const IframePreview: React.FC<IframePreviewProps> = ({ html }) => {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const innerString = `
      <style>
        body {
          width: 333px;
          height: 266px;
          margin: 0;
          overflow: hidden;
          background-color: #ffffff;
        }
      </style>
      ${html}
    `

    innerHTMLSanitizer(iframe, innerString)
  }, [html])

  return (
    <iframe
      ref={iframeRef}
      className='h-full w-full border-0 bg-white'
      title='Code result'
    />
  )
}

export const OutputView: React.FC<OutputViewProps> = ({
  editorValue,
  resultImageUrl,
  targetImageUrl,
  score,
  requiredScore,
  isChecking,
  isSubmitting,
  onCheck,
  onSubmit,
}) => {
  const [isSliderHidden, setIsSliderHidden] = React.useState<boolean>(false)
  const [isGridVisible, setIsGridVisible] = React.useState<boolean>(false)

  const t = useTranslations('signedIn.cssTask')

  const effectiveResultImageUrl = resultImageUrl ?? targetImageUrl ?? null
  const hasPreview = Boolean(effectiveResultImageUrl)

  const displayedScore = typeof score === 'number' ? score : 0

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg'>
      <div className='bg-gray border-b-codeBorder flex border-b'>
        <Button
          type='button'
          variant='blue'
          className='text-formErrorFont h-9 shrink-0 rounded-none px-4 text-sm font-medium shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]'
          aria-pressed
        >
          {t('panels.output')}
        </Button>
      </div>
      <div className='bg-gray flex flex-1 flex-col rounded-b-lg p-4'>
        <div className='h-66.5 w-83.25 relative rounded-lg bg-black/30'>
          {hasPreview && effectiveResultImageUrl ? (
            isSliderHidden ? (
              <IframePreview html={editorValue} />
            ) : (
              <ReactCompareSlider
                itemOne={<IframePreview html={editorValue} />}
                itemTwo={
                  <OutputImage
                    src={effectiveResultImageUrl}
                    alt='Target image'
                  />
                }
                handle={
                  <ReactCompareSliderHandle
                    linesStyle={{
                      transform: 'scale(1.16)',
                      width: '1px',
                      color: 'black',
                    }}
                    buttonStyle={{
                      position: 'relative',
                      backdropFilter: 'none',
                      background: 'white',
                      color: 'black',
                      border: '2px solid black',
                      transform: 'scale(0.7)',
                    }}
                  />
                }
                className='h-full w-full'
              />
            )
          ) : (
            <div className='flex h-full w-full items-center justify-center text-xs text-neutral-300'>
              {t('output.noData')}
            </div>
          )}
          {isGridVisible && (
            <div
              className='pointer-events-none absolute inset-0 z-10'
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255, 77, 77, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 77, 77, 0.6) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
          )}
        </div>
        <div className='flex w-full flex-col pt-8'>
          <div className='flex justify-between'>
            <Switch
              label={t('output.hideSlider')}
              checked={isSliderHidden}
              onChange={setIsSliderHidden}
            />
            <Switch
              label={t('output.showGrid')}
              checked={isGridVisible}
              onChange={setIsGridVisible}
            />
          </div>
          <div className='flex w-full justify-between p-4'>
            <span className='text-red text-formFont'>
              {t('output.score', { value: displayedScore })}
            </span>
            <div className='mx-2 w-7 shrink-0 rotate-90 border-t-2' />
            <span className='text-formFont'>
              {t('output.requiredScore', { value: requiredScore })}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Button
            type='button'
            variant='success'
            className='h-10 gap-2'
            disabled={!hasPreview || isChecking}
            onClick={onCheck}
          >
            {t('output.checkButton')}
            <RunIcon className='h-4 w-4' />
          </Button>
          <Button
            type='button'
            variant='blue'
            className='h-10 gap-2'
            disabled={!hasPreview || isSubmitting}
            onClick={onSubmit}
          >
            {t('output.submitButton')}
            <SubmitIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OutputView
