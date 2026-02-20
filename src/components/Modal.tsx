'use client'

import React from 'react'
import clsx from 'clsx'

import { Button } from '@/components'

export type ModalVariant = 'success' | 'error' | 'neutral'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: React.ReactNode
  buttonLabel: string
  variant?: ModalVariant

  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  buttonDisabled?: boolean
}

const getDefaultButtonVariant = (
  variant: ModalVariant
): React.ComponentProps<typeof Button>['variant'] => {
  if (variant === 'success') return 'success'
  if (variant === 'error') return 'red'
  return 'blue'
}

export const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  description,
  buttonLabel,
  variant = 'neutral',
  buttonVariant,
  buttonDisabled = false,
}) => {
  if (!isOpen) return null

  const isSuccess = variant === 'success'
  const isError = variant === 'error'

  return (
    <div
      onClick={onClose}
      className='bg-dark/60 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px]'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'bg-gray w-175 h-56.25 flex flex-col items-center justify-center gap-8 rounded-lg px-8 text-center shadow-[0_0_10px_0_#00000099]',
          {
            'border-green border': isSuccess,
            'border-red border': isError,
            'border-gray h-69.5 border': variant === 'neutral',
          }
        )}
      >
        <h2
          className={clsx('text-articleBigFont font-extralight', {
            'text-green': isSuccess,
            'text-red': isError,
            'text-white': variant === 'neutral',
          })}
        >
          {title}
        </h2>
        {description ? (
          <div
            className={clsx('text-formFont whitespace-pre-line font-medium', {
              'text-green': isSuccess,
              'text-red': isError,
              'text-white': variant === 'neutral',
            })}
          >
            {description}
          </div>
        ) : null}
        <Button
          type='button'
          onClick={onClose}
          variant={buttonVariant ?? getDefaultButtonVariant(variant)}
          disabled={buttonDisabled}
          className='w-75 h-10 px-5 py-2.5'
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
