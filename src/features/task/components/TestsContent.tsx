'use client'

import React from 'react'
import MonacoEditor, {
  type BeforeMount,
  type Monaco,
} from '@monaco-editor/react'
import { useTranslations } from 'next-intl'

import { CodeBlock } from './CodeBlock'
import { mockFullTestCases } from './testMocks'

type TestsContentProps = {
  activeTab: 'tests' | 'quick'
  quickInput: string
  onQuickInputChange: (value: string) => void
}

const THEME_NAME = 'codebusters-dark'

export const TestsContent: React.FC<TestsContentProps> = ({
  activeTab,
  quickInput,
  onQuickInputChange,
}) => {
  const t = useTranslations('signedIn.task.test')

  const beforeMount: BeforeMount = (monaco) => {
    defineTheme(monaco)
  }
  if (activeTab === 'quick') {
    return (
      <div className='flex flex-col'>
        <p className='text-sm font-semibold'>{t('testsWindow.valueLabel')}</p>
        <div className='code-editor-scroll border-codeBorder w-full overflow-hidden rounded-lg border shadow-[0px_4px_4px_0px_#00000040]'>
          <MonacoEditor
            height='25px'
            width='100%'
            language='javascript'
            theme={THEME_NAME}
            value={quickInput}
            onChange={(v) => onQuickInputChange(v ?? '')}
            beforeMount={beforeMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              fontSize: 14,
              renderLineHighlight: 'gutter',
              bracketPairColorization: { enabled: false },
              guides: {
                bracketPairs: false,
                bracketPairsHorizontal: false,
                highlightActiveBracketPair: false,
              },
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
                useShadows: false,
              },
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      {mockFullTestCases.slice(0, 3).map((tc) => (
        <div key={tc.id} className='flex flex-col'>
          <p className='text-formErrorFont'>
            {t('testsWindow.testCaseLabel', { id: tc.id })}
          </p>
          <CodeBlock value={tc.inputData} />
        </div>
      ))}
    </div>
  )
}

const defineTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme(THEME_NAME, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'identifier', foreground: '3FA9FF' },
      { token: 'string', foreground: 'F5A22E' },
      { token: 'number', foreground: '2D5BFF' },
      { token: 'keyword.json', foreground: '2D5BFF' },
    ],
    colors: {
      'editor.background': '#222426',
      'editorLineNumber.foreground': '#BDBDBD',
      'editorLineNumber.activeForeground': '#FFFFFF',
      'editor.lineHighlightBorder': '#00000000',
      'editorGutter.background': '#333537',
      'editorBracketHighlight.foreground1': '#FFFFFF',
      'editorBracketHighlight.foreground2': '#FFFFFF',
      'editorBracketHighlight.foreground3': '#FFFFFF',
      'editorBracketHighlight.foreground4': '#FFFFFF',
      'editorBracketHighlight.foreground5': '#FFFFFF',
      'editorBracketHighlight.foreground6': '#FFFFFF',
      'editorBracketMatch.background': '#00000000',
      'editorBracketMatch.border': '#00000000',
      'editorBracketPairGuide.activeBackground1': '#00000000',
      'editorBracketPairGuide.activeBackground2': '#00000000',
      'editorBracketPairGuide.activeBackground3': '#00000000',
      'editorBracketPairGuide.activeBackground4': '#00000000',
      'editorBracketPairGuide.activeBackground5': '#00000000',
      'editorBracketPairGuide.activeBackground6': '#00000000',
      'editorOverviewRuler.border': '#00000000',
    },
  })
}
