import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'
import { TaskTemplate, SubmittedWork, LayoutRecord } from '@/types/comic'
import { mockTasks } from '@/data/mockTasks'
import { mockWorks } from '@/data/mockWorks'

interface AppContextType {
  currentTaskId: string
  setCurrentTaskId: (id: string) => void
  tasks: TaskTemplate[]
  updateTask: (task: TaskTemplate) => void
  works: SubmittedWork[]
  addWork: (work: SubmittedWork) => void
  layoutHistory: LayoutRecord[][]
  addLayoutHistory: (layout: LayoutRecord[]) => void
  clearLayoutHistory: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTaskId, setCurrentTaskId] = useState<string>('task-001')
  const [tasks, setTasks] = useState<TaskTemplate[]>(mockTasks)
  const [works, setWorks] = useState<SubmittedWork[]>(mockWorks)
  const [layoutHistory, setLayoutHistory] = useState<LayoutRecord[][]>([])

  const updateTask = useCallback((updatedTask: TaskTemplate) => {
    console.log('[AppContext] 更新任务:', updatedTask.id)
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t))
  }, [])

  const addWork = useCallback((work: SubmittedWork) => {
    console.log('[AppContext] 添加作业:', work.id)
    setWorks(prev => [work, ...prev])
  }, [])

  const addLayoutHistory = useCallback((layout: LayoutRecord[]) => {
    console.log('[AppContext] 记录排版历史，共', layout.length, '条记录')
    setLayoutHistory(prev => [...prev, JSON.parse(JSON.stringify(layout))])
  }, [])

  const clearLayoutHistory = useCallback(() => {
    console.log('[AppContext] 清空排版历史')
    setLayoutHistory([])
  }, [])

  const value = useMemo(() => ({
    currentTaskId,
    setCurrentTaskId,
    tasks,
    updateTask,
    works,
    addWork,
    layoutHistory,
    addLayoutHistory,
    clearLayoutHistory
  }), [currentTaskId, tasks, works, layoutHistory, updateTask, addWork, addLayoutHistory, clearLayoutHistory])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
