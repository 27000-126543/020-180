import React, { useState, useMemo } from 'react'
import { View, Text, Button, Input, Textarea, Switch, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useAppContext } from '@/store/AppContext'
import { TaskTemplate, MoodType } from '@/types/comic'

const moodOptions: { value: MoodType; label: string; color: string }[] = [
  { value: 'suspense', label: '悬疑铺垫', color: '#6366F1' },
  { value: 'romance', label: '恋爱心动', color: '#EC4899' },
  { value: 'action', label: '战斗爆发', color: '#EF4444' }
]

const difficultyOptions = [
  { value: 1, label: '★' },
  { value: 2, label: '★★' },
  { value: 3, label: '★★★' },
  { value: 4, label: '★★★★' },
  { value: 5, label: '★★★★★' }
]

const panelCountOptions = [3, 4, 5, 6, 7, 8]

const TaskEditPage: React.FC = () => {
  const router = useRouter()
  const taskId = router.params.id || 'task-001'
  const { tasks, updateTask } = useAppContext()

  const originalTask = useMemo(() => {
    return tasks.find(t => t.id === taskId) || tasks[0]
  }, [tasks, taskId])

  const [title, setTitle] = useState(originalTask?.title || '')
  const [description, setDescription] = useState(originalTask?.description || '')
  const [mood, setMood] = useState<MoodType>(originalTask?.mood || 'suspense')
  const [moodLabel, setMoodLabel] = useState(originalTask?.moodLabel || '悬疑铺垫')
  const [difficulty, setDifficulty] = useState(originalTask?.difficulty || 3)
  const [requiredPanels, setRequiredPanels] = useState(originalTask?.requiredPanels || 4)
  const [endingCardPoint, setEndingCardPoint] = useState(originalTask?.endingCardPoint || false)
  const [deadline, setDeadline] = useState(originalTask?.deadline || '')
  const [tips, setTips] = useState<string[]>(originalTask?.tips || [])
  const [newTip, setNewTip] = useState('')

  const handleSave = () => {
    console.log('[TaskEdit] 保存任务:', taskId)
    if (!originalTask) return

    const updatedTask: TaskTemplate = {
      ...originalTask,
      title,
      description,
      mood,
      moodLabel,
      difficulty,
      requiredPanels,
      endingCardPoint,
      deadline: deadline || undefined,
      tips
    }

    updateTask(updatedTask)
    Taro.showToast({ title: '保存成功！', icon: 'success' })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const handleMoodChange = (m: MoodType, label: string) => {
    setMood(m)
    setMoodLabel(label)
  }

  const handleAddTip = () => {
    if (!newTip.trim()) {
      Taro.showToast({ title: '请输入提示内容', icon: 'none' })
      return
    }
    setTips([...tips, newTip.trim()])
    setNewTip('')
  }

  const handleRemoveTip = (idx: number) => {
    Taro.showModal({
      title: '删除提示',
      content: '确定要删除这条提示吗？',
      success: (res) => {
        if (res.confirm) {
          setTips(tips.filter((_, i) => i !== idx))
        }
      }
    })
  }

  const handleReset = () => {
    Taro.showModal({
      title: '重置修改',
      content: '确定要放弃所有修改吗？',
      success: (res) => {
        if (res.confirm && originalTask) {
          setTitle(originalTask.title)
          setDescription(originalTask.description)
          setMood(originalTask.mood)
          setMoodLabel(originalTask.moodLabel)
          setDifficulty(originalTask.difficulty)
          setRequiredPanels(originalTask.requiredPanels)
          setEndingCardPoint(originalTask.endingCardPoint)
          setDeadline(originalTask.deadline || '')
          setTips([...originalTask.tips])
        }
      }
    })
  }

  if (!originalTask) {
    return (
      <View className={styles.page}>
        <View style={{ padding: 100, textAlign: 'center' }}>
          <Text>任务不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.header}>
        <Button className={styles.backBtn} onClick={() => Taro.navigateBack()}>
          <Text>← 取消</Text>
        </Button>
        <Text className={styles.headerTitle}>编辑任务</Text>
        <Button className={styles.saveBtn} onClick={handleSave}>
          <Text>✓ 保存</Text>
        </Button>
      </View>

      <View className={styles.form}>
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>基础信息</Text>

          <View className={styles.formItem}>
            <Text className={styles.label}>任务标题</Text>
            <Input
              className={styles.input}
              value={title}
              onInput={(e) => setTitle(e.detail.value)}
              placeholder="输入任务标题"
            />
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>任务描述</Text>
            <Textarea
              className={styles.textarea}
              value={description}
              onInput={(e) => setDescription(e.detail.value)}
              placeholder="描述任务的场景和要求"
            />
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>目标情绪</Text>
            <View className={styles.moodOptions}>
              {moodOptions.map(opt => (
                <Button
                  key={opt.value}
                  className={classnames(styles.moodBtn, mood === opt.value && styles.active)}
                  style={mood === opt.value ? { background: `${opt.color} !important` } : {}}
                  onClick={() => handleMoodChange(opt.value, opt.label)}
                >
                  <Text>{opt.label}</Text>
                </Button>
              ))}
            </View>
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>难度等级</Text>
            <View className={styles.difficultyOptions}>
              {difficultyOptions.map(opt => (
                <Button
                  key={opt.value}
                  className={classnames(styles.difficultyBtn, difficulty === opt.value && styles.active)}
                  onClick={() => setDifficulty(opt.value)}
                >
                  <Text>{opt.label}</Text>
                </Button>
              ))}
            </View>
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>排版要求</Text>

          <View className={styles.formItem}>
            <Text className={styles.label}>必须使用的画格数量</Text>
            <View className={styles.panelCountOptions}>
              {panelCountOptions.map(n => (
                <Button
                  key={n}
                  className={classnames(styles.countBtn, requiredPanels === n && styles.active)}
                  onClick={() => setRequiredPanels(n)}
                >
                  <Text>{n} 格</Text>
                </Button>
              ))}
            </View>
          </View>

          <View className={styles.formItem}>
            <View className={styles.rowLabel}>
              <Text className={styles.label}>结尾卡点</Text>
              <Text className={styles.hint}>最后一格需留有悬念或情感冲击</Text>
            </View>
            <Switch
              checked={endingCardPoint}
              onChange={(e) => setEndingCardPoint(e.detail.value)}
              color="#FF6B35"
            />
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>截止日期</Text>
            <Input
              className={styles.input}
              value={deadline}
              onInput={(e) => setDeadline(e.detail.value)}
              placeholder="例如：2025-01-15"
            />
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>老师提示</Text>

          {tips.map((tip, idx) => (
            <View key={idx} className={styles.tipItem}>
              <View className={styles.tipDot} />
              <Text className={styles.tipText}>{tip}</Text>
              <Button className={styles.removeTipBtn} onClick={() => handleRemoveTip(idx)}>
                <Text>✕</Text>
              </Button>
            </View>
          ))}

          <View className={styles.addTipRow}>
            <Input
              className={styles.tipInput}
              value={newTip}
              onInput={(e) => setNewTip(e.detail.value)}
              placeholder="输入新的教学提示"
            />
            <Button className={styles.addBtn} onClick={handleAddTip}>
              <Text>+ 添加</Text>
            </Button>
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>可用画格（共 {originalTask.panels.length} 个）</Text>
          <View className={styles.panelGrid}>
            {originalTask.panels.map(panel => (
              <View key={panel.id} className={styles.panelThumb}>
                <Text className={styles.panelIndex}>{originalTask.panels.indexOf(panel) + 1}</Text>
                <Text className={styles.panelDesc}>{panel.description}</Text>
              </View>
            ))}
          </View>
          <Text className={styles.notice}>画格素材和对白文本需由管理员在后台配置</Text>
        </View>

        <View className={styles.bottomActions}>
          <Button className={styles.resetBtn} onClick={handleReset}>
            <Text>重置修改</Text>
          </Button>
          <Button className={styles.saveFinalBtn} onClick={handleSave}>
            <Text>保存并发布</Text>
          </Button>
        </View>

        <View style={{ height: 80 }} />
      </View>
    </ScrollView>
  )
}

export default TaskEditPage
