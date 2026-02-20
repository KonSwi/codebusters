'use client'

import { useTranslations } from 'next-intl'

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

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex flex-col gap-4 text-xs font-medium'>
        <p>
          {t('description.category')}: {data.category}{' '}
          <span className='mx-2'>|</span> {t('description.solved')}:{' '}
          {data.solvedCount} {t('description.times')}
          <span className='mx-2'>|</span>{' '}
        </p>
        <p>
          {t('description.difficulty')}: {data.difficulty}
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <h2 className='text-2xl font-medium leading-tight'>{data.title}</h2>
        <span className='bg-green flex h-6 w-6 items-center justify-center rounded-lg text-sm font-bold'>
          ✓
        </span>
      </div>
      <p className='text-formErrorFont whitespace-pre-wrap leading-6'>
        {data.description}
      </p>

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
}
