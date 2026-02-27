'use client'

import CodeEditorWrapper from './CodeEditorWrapper'

type EditorProps = {
  taskId: string
}

export const Editor: React.FC<EditorProps> = ({ taskId }) => {
  return <CodeEditorWrapper taskId={taskId} />
}
