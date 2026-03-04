'use client'

import React from 'react'
import clsx from 'clsx'

type SwitchProps = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <label className='text-formErrorFont flex cursor-pointer gap-1 px-4'>
      <div
        className={clsx('relative h-5 w-10 rounded-full transition-colors', {
          'bg-blue': checked,
          'bg-grayLightTask': !checked,
        })}
        onClick={() => onChange(!checked)}
      >
        <div
          className={clsx(
            'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white transition-all',
            {
              'right-1': checked,
              'left-1': !checked,
            }
          )}
        />
      </div>
      <span>{label}</span>
    </label>
  )
}
