'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { Modal, Button } from '@/components'

import { getRegisterSchema, type RegisterSchema } from '../schema'

type RegisterPayload = {
  name: string
  email: string
  password: string
}

export const RegisterForm: React.FC = () => {
  const t = useTranslations('register')
  const locale = useLocale()
  const loginHref = `/${locale}/login`

  const [showModal, setShowModal] = React.useState(false)
  const [email, setEmail] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(getRegisterSchema(locale)),
    mode: 'onChange',
  })

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          message?: string
        } | null

        throw new Error(data?.message || 'Registration failed')
      }

      return res.json()
    },
    onSuccess: (_data, variables) => {
      setEmail(variables.email)
      setShowModal(true)
      reset()
    },
    onError: (err) => {
      const message =
        err instanceof Error ? err.message : 'Something went wrong'
      enqueueSnackbar(message, { variant: 'error' })
    },
  })

  const onSubmit = (data: RegisterSchema) => {
    const name = `${data.firstName} ${data.lastName}`.trim()
    registerMutation.mutate({
      name,
      email: data.email,
      password: data.password,
    })
  }

  const submitDisabled = !isValid || registerMutation.isPending
  const submitText = registerMutation.isPending ? 'Loading...' : t('submit')

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-gray w-175 h-163.5 z-0 mb-24 mt-4 flex flex-col gap-3.5 rounded-lg p-8 shadow-[0_0_10px_rgba(0,0,0,0.6)]'
      >
        <h1 className='text-articleBigFont mb-1 font-extralight'>
          {t('title')}
        </h1>
        <div className='flex flex-row justify-between gap-1'>
          <div className='w-75 flex flex-col'>
            <span className='text-formFont font-medium'>{t('nickname')}</span>
            <input
              {...register('nickname')}
              placeholder={t('nickname')}
              className={clsx(
                'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
                { 'outline-red outline': errors.nickname }
              )}
            />
            <span className='text-red text-formErrorFont h-4.5 font-extralight'>
              {errors.nickname?.message || ''}
            </span>
          </div>
          <div className='w-75 flex flex-col'>
            <span className='text-formFont font-medium'>{t('firstName')}</span>
            <input
              {...register('firstName')}
              placeholder={t('firstName')}
              className={clsx(
                'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
                { 'outline-red outline': errors.firstName }
              )}
            />
            <span className='text-red text-formErrorFont h-4.5 font-extralight'>
              {errors.firstName?.message || ''}
            </span>
          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='w-75 flex flex-col'>
            <span className='text-formFont font-medium'>{t('lastName')}</span>
            <input
              {...register('lastName')}
              placeholder={t('lastName')}
              className={clsx(
                'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
                { 'outline-red outline': errors.lastName }
              )}
            />
            <span className='text-red text-formErrorFont h-4.5 font-extralight'>
              {errors.lastName?.message || ''}
            </span>
          </div>
          <div className='w-75 flex flex-col'>
            <span className='text-formFont font-medium'>{t('email')}</span>
            <input
              {...register('email')}
              placeholder='name@example.com'
              type='email'
              className={clsx(
                'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
                { 'outline-red outline': errors.email }
              )}
            />
            <span className='text-red text-formErrorFont h-4.5 font-extralight'>
              {errors.email?.message || ''}
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-formFont font-medium'>{t('password')}</span>
          <input
            {...register('password')}
            type='password'
            placeholder='••••••••••'
            className={clsx(
              'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
              { 'outline-red outline': errors.password }
            )}
          />
          <span className='text-red text-formErrorFont h-4.5 font-extralight'>
            {errors.password?.message || ''}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-formFont font-medium'>
            {t('confirmPassword')}
          </span>
          <input
            {...register('confirmPassword')}
            type='password'
            placeholder='••••••••••'
            className={clsx(
              'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full gap-2.5 rounded-lg border px-4 py-3',
              { 'outline-red outline': errors.confirmPassword }
            )}
          />
          <span className='text-red text-formErrorFont h-4.5 font-extralight'>
            {errors.confirmPassword?.message || ''}
          </span>
        </div>
        <div className='flex flex-col'>
          <label className='flex items-center gap-2 text-sm'>
            <input
              type='checkbox'
              {...register('acceptTerms')}
              className="bg-formGray border-formBorder checked:bg-blue checked:border-blue relative h-4 w-4 cursor-pointer appearance-none rounded checked:before:absolute checked:before:-top-0.5 checked:before:left-0.5 checked:before:text-white checked:before:content-['✔']"
            />
            <span>
              {t('acceptTerms')}
              <Link href='#' className='text-blue hover:underline'>
                {t('termsLink')}
              </Link>
            </span>
          </label>
          <span className='text-red text-formErrorFont h-4.5 font-extralight'>
            {errors.acceptTerms?.message || ''}
          </span>
        </div>
        <Button
          type='submit'
          variant='blue'
          disabled={submitDisabled}
          aria-busy={registerMutation.isPending}
        >
          {submitText}
        </Button>
        <div className='flex'>
          <p className='mt-2 text-center text-sm'>
            {t('alreadyHaveAccount')}
            <Link href={loginHref} className='text-blue hover:underline'>
              {t('loginLink')}
            </Link>
          </p>
        </div>
      </form>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        variant='neutral'
        title={t('modal.title')}
        description={
          <div className='flex flex-col gap-4'>
            <p>{t('modal.body', { email })}</p>
            <p>{t('modal.failure')}</p>
          </div>
        }
        buttonLabel={t('modal.resend')}
        buttonVariant='blue'
        buttonDisabled
      />
    </>
  )
}
