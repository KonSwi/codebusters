'use client'

import React from 'react'
import type { ReactNode } from 'react'

type TasksListProps = {
  children: ReactNode
}

export const TasksList: React.FC<TasksListProps> = ({ children }) => {
  return <div>{children}</div>
}
