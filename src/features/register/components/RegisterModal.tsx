'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components'

type Props = {
  email: string
  onClose: () => void
}

export const RegisterModal: React.FC<Props> = ({ email, onClose }) => {
  const t = useTranslations('register.modal')

  return (
    <div
      onClick={onClose}
      className='bg-dark/80 fixed inset-0 z-50 flex items-center justify-center'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-gray w-175 h-69.5 flex flex-col items-center gap-8 rounded-lg p-8 text-center opacity-100 shadow-[0_0_10px_0_#00000099]'
      >
        <h2 className='text-articleBigFont font-extralight'>{t('title')}</h2>
        <p className='text-formFont font-medium'>{t('body', { email })}</p>
        <p className='text-formFont font-medium'>{t('failure')}</p>
        <Button variant='blue' className='w-80 px-6 py-2' disabled>
          {t('resend')}
        </Button>
      </div>
    </div>
  )
}
