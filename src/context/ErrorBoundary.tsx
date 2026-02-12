'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('ErrorBoundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-8'>
          <h1>Something went wrong</h1>
        </div>
      )
    }

    return this.props.children
  }
}
