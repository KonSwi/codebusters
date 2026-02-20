'use client'

import React from 'react'
import MonacoEditor, {
  type Monaco,
  type BeforeMount,
} from '@monaco-editor/react'
import clsx from 'clsx'

type CodeBlockProps = {
  value: string
  className?: string
}

const THEME_NAME = 'codebusters-dark'

export const CodeBlock: React.FC<CodeBlockProps> = ({ value, className }) => {
  const beforeMount: BeforeMount = (monaco) => {
    defineTheme(monaco)
  }

  return (
    <div
      className={clsx(
        'code-editor-scroll border-codeBorder w-full overflow-hidden rounded-lg border shadow-[0px_4px_4px_0px_#00000040]',
        className
      )}
    >
      <MonacoEditor
        height='80px'
        width='100%'
        language='javascript'
        theme={THEME_NAME}
        value={value}
        beforeMount={beforeMount}
        options={{
          readOnly: true,
          domReadOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
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
