export type MoodType = 'suspense' | 'romance' | 'action'

export interface ComicPanel {
  id: string
  imageUrl: string
  width: number
  height: number
  description: string
}

export interface DialogueItem {
  id: string
  text: string
  targetPanelId?: string
  position?: { x: number; y: number }
}

export interface TaskTemplate {
  id: string
  title: string
  description: string
  mood: MoodType
  moodLabel: string
  difficulty: number
  requiredPanels: number
  endingCardPoint: boolean
  panels: ComicPanel[]
  dialogues: DialogueItem[]
  deadline?: string
  teacherName: string
  tips: string[]
}

export interface LayoutRecord {
  panelId: string
  order: number
  marginTop: number
  marginBottom: number
  dialogues: DialogueItem[]
  modifiedAt: number
}

export interface SubmittedWork {
  id: string
  taskId: string
  taskTitle: string
  mood: MoodType
  moodLabel: string
  studentName: string
  submittedAt: string
  status: 'pending' | 'reviewed'
  score?: number
  teacherComment?: string
  layoutHistory: LayoutRecord[][]
  finalLayout: LayoutRecord[]
  usedPanels: number
}

export interface TipItem {
  type: 'warning' | 'info' | 'success'
  title: string
  content: string
}
