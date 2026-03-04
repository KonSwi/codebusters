'use client'

import CodeEditorWrapper from '@/features/jsTask/components/editor/CodeEditorWrapper'
type EditorProps = {
  taskId: string
}

export const Editor: React.FC<EditorProps> = ({ taskId }) => {
  return <CodeEditorWrapper taskId={taskId} />
}
