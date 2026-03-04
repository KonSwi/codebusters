'use client'

import clsx from 'clsx'

import { useCodeEditor } from '@/context'

export const Console = () => {
  const { consoleLines } = useCodeEditor()

  return (
    <div className='h-40 w-full overflow-y-auto rounded-md font-mono text-sm leading-6'>
      <div className='flex flex-col gap-1 whitespace-pre-wrap p-4'>
        {consoleLines.map((line) => (
          <div
            key={line.id}
            className={clsx('wrap-break-words', {
              'text-white': line.type === 'info',
              'text-green': line.type === 'success',
              'text-red': line.type === 'error',
            })}
          >
            {line.message}
          </div>
        ))}
      </div>
    </div>
  )
}
