'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
}

const SignOutLayout: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default SignOutLayout
