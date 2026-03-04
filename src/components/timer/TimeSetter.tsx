'use client'

import React from 'react'

import { Button } from '@/components'

export type TimeSetterProps = {
  label: string
  inputMinutes: string
  onChangeMinutes: (value: string) => void
  isRunning: boolean
  startDisabled: boolean
  startLabel: string
  pauseLabel: string
  resetLabel: string
  onStartPause: () => void
  onReset: () => void
}
const MAX_MINUTES = 999

const TimeSetter: React.FC<TimeSetterProps> = ({
  label,
  inputMinutes,
  onChangeMinutes,
  isRunning,
  startDisabled,
  startLabel,
  pauseLabel,
  resetLabel,
  onStartPause,
  onReset,
}) => {
  const increase = () => {
    const current = Number(inputMinutes) || 0
    if (current >= MAX_MINUTES) return
    onChangeMinutes(String(current + 1))
  }

  const decrease = () => {
    const current = Number(inputMinutes) || 0
    if (current <= 0) return
    onChangeMinutes(String(current - 1))
  }

  return (
    <div className='px-6 pb-6'>
      <p>{label}</p>
      <div className='relative mb-4'>
        <input
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={inputMinutes}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 3)
            onChangeMinutes(value)
          }}
          placeholder='0'
          className='bg-formGray w-67 rounded-lg px-4 py-3 pr-10'
        />

        <div className='absolute right-1 top-1/2 flex -translate-y-1/2 flex-col gap-2'>
          <Button
            type='button'
            variant='icon'
            onClick={increase}
            className='h-4 w-4 p-0'
            aria-label='Increase minutes'
          >
            ▲
          </Button>
          <Button
            type='button'
            variant='icon'
            onClick={decrease}
            className='h-4 w-4 p-0'
            aria-label='Decrease minutes'
          >
            ▼
          </Button>
        </div>
      </div>
      <div className='flex justify-center gap-4'>
        <Button
          type='button'
          variant='orange'
          onClick={onStartPause}
          disabled={startDisabled}
        >
          {isRunning ? pauseLabel : startLabel}
        </Button>
        <Button type='button' variant='orange' onClick={onReset}>
          {resetLabel}
        </Button>
      </div>
    </div>
  )
}

export default TimeSetter
