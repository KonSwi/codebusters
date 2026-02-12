'use client'

import React from 'react'
import { Sidebar } from './components/Sidebar'
import { SignInTopBar } from './components/SignInTopBar'
import { SocialMediaBar } from '@/components'

type Props = {
  children: React.ReactNode
}

const SignInLayout: React.FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  return (
    <div className='min-h-dvh bg-grayBackground'>
      <SocialMediaBar />
      <SignInTopBar />
      <div className='flex'>
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((v) => !v)}
        />
        <main className='flex-1 p-10'>
          <div className='container'>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default SignInLayout
