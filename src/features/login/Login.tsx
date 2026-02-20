'use client'

import Image from 'next/image'

import { SocialMediaBar } from '@/components'
import { SignOutTopBar } from '@/features/signOutLayout/components/SignOutTopBar'
import { Footer } from '@/features/signOutLayout/components/Footer'

import { LoginForm } from './components/LoginForm'

export const Login = () => {
  return (
    <>
      <div className='min-h-dvh flex flex-col'>
        <SocialMediaBar />
        <SignOutTopBar />
        <main className='bg-dark/90 relative flex flex-1 items-center justify-center'>
          <Image
            src='/hero/heroImage.jpg'
            alt='Background'
            fill
            priority
            className='brightness-80 object-cover object-center blur-[10px]'
          />
          <LoginForm />
        </main>
      </div>
      <Footer />
    </>
  )
}
