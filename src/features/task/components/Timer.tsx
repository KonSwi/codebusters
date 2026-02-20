'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { usePageVisibility } from 'react-page-visibility'

import { Button } from '@/components'
import { useTimer } from '@/features/task/hooks/useTimer'
import TimeSetter from '@/features/task/components/TimeSetter'

export type TimerProps = {
  className?: string
}

const formatTopBarTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const hh = hours.toString().padStart(2, '0')
  const mm = minutes.toString().padStart(2, '0')
  const ss = seconds.toString().padStart(2, '0')

  if (hours > 0) {
    return `${hh}:${mm}:${ss}`
  }

  return `${mm}:${ss}`
}

const formatPopoverTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const hh = hours.toString().padStart(2, '0')
  const mm = minutes.toString().padStart(2, '0')
  const ss = seconds.toString().padStart(2, '0')

  return `${hh}:${mm}:${ss}`
}

const Timer: React.FC<TimerProps> = ({ className }) => {
  const t = useTranslations('signedIn.task.timer')
  const {
    isOpen,
    mode,
    seconds,
    isRunning,
    inputMinutes,
    countdownStartDisabled,

    setInputMinutes,
    toggleOpen,
    resetAll,
    setStopwatchMode,
    setCountdownMode,
    toggleStopwatchRunning,
    handleCountdownStartPause,
  } = useTimer()

  const isVisible = usePageVisibility()
  const shouldResumeRef = React.useRef(false)

  React.useEffect(() => {
    if (!isVisible) {
      if (isRunning) {
        shouldResumeRef.current = true

        if (mode === 'stopwatch') toggleStopwatchRunning()
        if (mode === 'countdown') handleCountdownStartPause()
      }
      return
    }

    if (shouldResumeRef.current) {
      shouldResumeRef.current = false

      if (mode === 'stopwatch') toggleStopwatchRunning()
      if (mode === 'countdown') handleCountdownStartPause()
    }
  }, [
    isVisible,
    isRunning,
    mode,
    toggleStopwatchRunning,
    handleCountdownStartPause,
  ])

  return (
    <div className='relative'>
      <Button
        type='button'
        variant='timer'
        onClick={toggleOpen}
        className={clsx(
          'group',
          {
            'bg-green': isRunning,
            'bg-blueOff': !isRunning && !isOpen,
            'bg-blue': !isRunning && isOpen,
            'shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]': isOpen,
          },
          className
        )}
        aria-label={t('aria.button')}
      >
        <svg
          className='h-4 w-4 transition-transform duration-200 group-hover:scale-150'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <circle cx='12' cy='12' r='10' />
          <path d='M12 6v6l4 2' />
        </svg>

        {formatTopBarTime(seconds)}
      </Button>
      {isOpen && (
        <div className='bg-gray top-13 w-75 absolute left-4 z-50 overflow-hidden rounded-lg shadow-lg'>
          <div className='flex'>
            <Button
              type='button'
              variant='blue'
              onClick={setStopwatchMode}
              className={clsx(
                'w-1/2 rounded-none px-4 py-3 text-sm font-semibold',
                {
                  'bg-blue shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]':
                    mode === 'stopwatch',
                  'bg-blueOff': mode !== 'stopwatch',
                }
              )}
            >
              {t('tabs.stopwatch')}
            </Button>
            <Button
              type='button'
              variant='blue'
              onClick={setCountdownMode}
              className={clsx(
                'w-1/2 rounded-none px-4 py-3 text-sm font-semibold',
                {
                  'bg-blue shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.5)]':
                    mode === 'countdown',
                  'bg-blueOff': mode !== 'countdown',
                }
              )}
            >
              {t('tabs.countdown')}
            </Button>
          </div>
          <div className='p-6 text-4xl'>{formatPopoverTime(seconds)}</div>
          {mode === 'stopwatch' && (
            <div className='flex justify-center gap-4 pb-6'>
              <Button
                type='button'
                variant='orange'
                onClick={toggleStopwatchRunning}
              >
                {isRunning ? t('actions.pause') : t('actions.start')}
              </Button>
              <Button type='button' variant='orange' onClick={resetAll}>
                {t('actions.reset')}
              </Button>
            </div>
          )}
          {mode === 'countdown' && (
            <TimeSetter
              label={t('labels.minutes')}
              inputMinutes={inputMinutes}
              onChangeMinutes={setInputMinutes}
              isRunning={isRunning}
              startDisabled={countdownStartDisabled}
              startLabel={t('actions.start')}
              pauseLabel={t('actions.pause')}
              resetLabel={t('actions.reset')}
              onStartPause={handleCountdownStartPause}
              onReset={resetAll}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Timer
