'use client'

import React from 'react'

import { CodeEditor } from '@/components/CodeEditor'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <div className='flex h-full flex-col rounded-lg'>
      <div className='flex-1 overflow-hidden rounded-lg'>
        <CodeEditor value={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default Editor
