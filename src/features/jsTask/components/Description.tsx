'use client'

import { useTranslations } from 'next-intl'

import { TaskDescription } from '@/components/TaskDescription'

export type TaskDescriptionData = {
  category: string
  solvedCount: number
  difficulty: string
  title: string
  description: string
  sampleInput?: string
  sampleOutput?: string
}

type DescriptionProps = {
  data: TaskDescriptionData
}

const CodeBlock = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex flex-col'>
      <p className='text-sm font-semibold'>{label}</p>
      <div className='bg-grayLightTask rounded-lg px-4 py-2 text-sm shadow-[0px_4px_4px_0px_#00000040]'>
        <div className='whitespace-pre-wrap leading-6'>{value}</div>
      </div>
    </div>
  )
}

export default function Description({ data }: DescriptionProps) {
  const t = useTranslations('signedIn.task')

  const meta = (
    <div className='flex flex-col gap-1.5 text-xs font-medium'>
      <p>
        {t('description.category')}: {data.category}{' '}
        <span className='mx-2'>|</span> {t('description.solved')}:{' '}
        {data.solvedCount} {t('description.times')}
      </p>
      <p>
        {t('description.difficulty')}: {data.difficulty}
      </p>
    </div>
  )

  const extra = (
    <div className='flex flex-col gap-3'>
      {data.sampleInput ? (
        <CodeBlock
          label={t('description.sampleInput')}
          value={data.sampleInput}
        />
      ) : null}
      {data.sampleOutput ? (
        <CodeBlock
          label={t('description.sampleOutput')}
          value={data.sampleOutput}
        />
      ) : null}
    </div>
  )

  const titleRightIcon = (
    <span className='bg-green flex h-6 w-6 items-center justify-center rounded-lg text-sm font-bold'>
      ✓
    </span>
  )

  return (
    <TaskDescription
      meta={meta}
      title={data.title}
      description={data.description}
      titleRightIcon={titleRightIcon}
      extra={extra}
    />
  )
}
