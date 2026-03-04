import React from 'react'

import { Modal } from '@/components'
import type { ModalVariant } from '@/components/Modal'

type ScoreModalProps = {
  isOpen: boolean
  onClose: () => void
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel: string
  variant?: ModalVariant
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  buttonLabel,
  variant = 'neutral',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      buttonLabel={buttonLabel}
      variant={variant}
    />
  )
}
