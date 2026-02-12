import React from 'react'
import SignInLayout from '@/features/signInLayout/layout'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SignInLayout>{children}</SignInLayout>
}
