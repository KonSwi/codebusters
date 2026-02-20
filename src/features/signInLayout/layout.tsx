'use client'

import React from 'react'

import { SocialMediaBar } from '@/components'

import { Sidebar } from './components/Sidebar'
import { SignInTopBar } from './components/SignInTopBar'

type Props = {
  children: React.ReactNode
}

const SignInLayout: React.FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  return (
    <div className='h-dvh bg-dark flex flex-col overflow-hidden'>
      <SocialMediaBar />
      <SignInTopBar />
      <div className='flex min-h-0 flex-1 overflow-hidden'>
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((v) => !v)}
        />
        <main className='min-h-0 flex-1 overflow-hidden px-8 py-5'>
          <div className='h-full min-h-0 w-full overflow-hidden'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default SignInLayout
