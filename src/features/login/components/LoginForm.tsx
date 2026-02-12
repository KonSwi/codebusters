'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, useLocale } from 'next-intl'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { getLoginSchema, LoginSchema } from '../schema'
import { Button } from '@/components'

export const LoginForm = () => {
  const t = useTranslations('login')
  const locale = useLocale()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const registerHref = `/${locale}/register`
  const dashboardHref = `/${locale}/dashboard`

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(getLoginSchema(locale)),
    mode: 'onChange',
  })

  const onSubmit = async (values: LoginSchema) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: dashboardHref,
    })

    if (!result) {
      enqueueSnackbar(t('errors.default'), { variant: 'error' })
      return
    }

    if (result.error) {
      const key = `errors.${result.error}` as const
      const message = t.has(key) ? t(key) : t('errors.default')
      enqueueSnackbar(message, { variant: 'error' })
      return
    }

    enqueueSnackbar(t('notifications.success'), { variant: 'success' })
    router.push(dashboardHref)
    router.refresh()
  }

  const onInvalid = () => {
    const email = getValues('email')?.trim()
    const password = getValues('password')

    if (!email || !password) {
      enqueueSnackbar(t('errors.missingEmailOrPassword'), { variant: 'error' })
    }
  }

  const onGithubSubmit = () => {
    void signIn('github', { callbackUrl: dashboardHref })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className='w-md bg-gray z-0 mb-24 mt-4 flex flex-col gap-8 rounded-lg p-8 shadow-[0px_0px_10px_0px_#00000099]'
    >
      <h1 className='text-articleBigFont font-extralight'>{t('title')}</h1>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col'>
          <label className='text-'>{t('email')}</label>
          <input
            {...register('email')}
            type='email'
            placeholder='name@example.com'
            className={clsx(
              'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
              { 'outline-red outline': errors.email }
            )}
          />
          <span className='text-red text-formErrorFont font-extralight'>
            {errors.email?.message}
          </span>
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm'>{t('password')}</label>
          <input
            {...register('password')}
            type='password'
            placeholder='•••••••••'
            className={clsx(
              'text-formFont bg-formGray placeholder-formPlaceholder border-formBorder w-full rounded-md border px-4 py-3',
              { 'outline-red outline': errors.password }
            )}
          />
          <span className='text-red text-formErrorFont font-extralight'>
            {errors.password?.message}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-4 text-sm'>
            <input
              type='checkbox'
              className="bg-formGray border-formBorder checked:bg-blue checked:border-blue relative h-4 w-4 cursor-pointer appearance-none rounded checked:before:absolute checked:before:-top-0.5 checked:before:left-0.5 checked:before:text-white checked:before:content-['✔']"
            />
            {t('rememberMe')}
          </label>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Button type='submit' variant='blue'>
          {t('submit')}
        </Button>
        <Link href='' className='text-blue text-sm underline'>
          {t('forgotPassword')}
        </Link>
      </div>
      <Button type='button' variant='black' onClick={onGithubSubmit}>
        <span>{t('loginWithGithub')}</span>
        <Image src='/icons/github.svg' alt='Github' width={18} height={18} />
      </Button>
      <p className='mt-1 text-sm'>
        {t('noAccount')}
        <Link href={registerHref} className='text-blue underline'>
          {t('register')}
        </Link>
      </p>
    </form>
  )
}
