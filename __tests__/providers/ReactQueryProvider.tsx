import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type AppProviderProps = {
  children: React.ReactNode
}

const ReactQueryProvider = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
