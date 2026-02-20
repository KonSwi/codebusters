'use client'

import React from 'react'

import MonacoEditor, {
  type Monaco,
  type BeforeMount,
  type OnMount,
} from '@monaco-editor/react'

type CodeEditorProps = {
  value: string
  onChange: (value: string) => void
}

type EditorLike = { updateOptions: (options: Record<string, unknown>) => void }

const THEME_NAME = 'codebusters-dark'

type EditorInstance = Parameters<OnMount>[0]

const getDigitsFromValue = (value: string) => {
  const lines = value ? value.split('\n').length : 1
  return String(lines).length
}

const getGutterOptions = (digits: number) => {
  if (digits <= 1) return { lineNumbersMinChars: 5 }
  if (digits === 2) return { lineNumbersMinChars: 6 }
  return { lineNumbersMinChars: 7 }
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editorRef = React.useRef<EditorInstance | null>(null)

  const beforeMount: BeforeMount = (monaco) => {
    defineTheme(monaco)
  }

  const applyGutter = React.useCallback(() => {
    if (!editorRef.current) return
    editorRef.current.updateOptions(getGutterOptions(getDigitsFromValue(value)))
  }, [value])

  const onMount: OnMount = (editor) => {
    editorRef.current = editor
    applyGutter()
  }

  React.useEffect(() => {
    applyGutter()
  }, [applyGutter])

  return (
    <div className='code-editor-scroll h-full w-full overflow-hidden'>
      <MonacoEditor
        height='100%'
        width='100%'
        language='javascript'
        theme={THEME_NAME}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        beforeMount={beforeMount}
        onMount={onMount}
        options={{
          minimap: { enabled: false },
          fontSize: 10,
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
