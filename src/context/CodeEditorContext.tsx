'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

type ConsoleLine = {
  id: string
  type: 'info' | 'success' | 'error'
  message: string
}

type CodeEditorContextType = {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  result: 'success' | 'error' | null
  setResult: React.Dispatch<React.SetStateAction<'success' | 'error' | null>>
  consoleLines: ConsoleLine[]
  setConsoleLines: React.Dispatch<React.SetStateAction<ConsoleLine[]>>
  isRunning: boolean
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  clearConsole: () => void
  runCode: () => Promise<void>
}

const CodeEditorContext = React.createContext<
  CodeEditorContextType | undefined
>(undefined)

export const CodeEditorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [code, setCode] = React.useState<string>('')
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [result, setResult] = React.useState<'success' | 'error' | null>(null)
  const [consoleLines, setConsoleLines] = React.useState<ConsoleLine[]>([])
  const [isRunning, setIsRunning] = React.useState<boolean>(false)

  const clearConsole = () => setConsoleLines([])

  const t = useTranslations('signedIn.task.console')

  const runCode = async () => {
    setIsRunning(true)
    setConsoleLines([])

    const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

    const pushLine = (type: ConsoleLine['type'], message: string) => {
      setConsoleLines((prev) => [...prev, { id: makeId(), type, message }])
    }

    try {
      const trimmed = code.trim()

      if (trimmed.length === 0) {
        pushLine('error', t('emptyCode'))
        return
      }

      const res = await fetch('/api/codeRun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      const data = (await res.json()) as { lines?: ConsoleLine[] }

      setConsoleLines(data.lines ?? [])
    } catch (e) {
      pushLine('error', e instanceof Error ? e.message : String(e))
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <CodeEditorContext.Provider
      value={{
        code,
        setCode,
        isModalOpen,
        setIsModalOpen,
        result,
        setResult,
        consoleLines,
        setConsoleLines,
        isRunning,
        setIsRunning,
        clearConsole,
        runCode,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  )
}

export const useCodeEditor = () => {
  const context = React.useContext(CodeEditorContext)
  if (!context) {
    throw new Error('useCodeEditor must be used within a CodeEditorProvider')
  }
  return context
}
