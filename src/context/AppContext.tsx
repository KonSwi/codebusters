'use client'

import React from 'react'
import { SnackbarProvider } from 'notistack'
import { SessionProvider } from 'next-auth/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ErrorBoundary } from './ErrorBoundary'

type Props = {
  children: React.ReactNode
}

const LoadingFallback = () => {
  return (
    <div className='bg-dark flex min-h-screen items-center justify-center'>
      <div className='bg-gray rounded-lg p-8 text-2xl'>Loading...</div>
    </div>
  )
}

export const AppContext: React.FC<Props> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingFallback />}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
          </SessionProvider>
        </QueryClientProvider>
      </React.Suspense>
    </ErrorBoundary>
  )
}
