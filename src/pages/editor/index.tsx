import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import ComicPanel from '@/components/ComicPanel'
import PhonePreview from '@/components/PhonePreview'
import TipPanel from '@/components/TipPanel'
import { useAppContext } from '@/store/AppContext'
import { LayoutRecord, DialogueItem, TipItem, MoodType } from '@/types/comic'

const EditorPage: React.FC = () => {
  const {
    currentTaskId,
    tasks,
    addWork,
    layoutHistory,
    addLayoutHistory,
    clearLayoutHistory
  } = useAppContext()

  const currentTask = useMemo(
    () => tasks.find(t => t.id === currentTaskId) || tasks[0],
    [tasks, currentTaskId]
  )

  const defaultLayout = useCallback((): LayoutRecord[] => {
    if (!currentTask) return []
    return currentTask.panels.slice(0, currentTask.requiredPanels).map((panel, idx) => ({
      panelId: panel.id,
      order: idx,
      marginTop: idx === 0 ? 0 : 40,
      marginBottom: 40,
      dialogues: [],
      modifiedAt: Date.now()
    }))
  }, [currentTask])

  const [layout, setLayout] = useState<LayoutRecord[]>([])
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null)
  const [selectedSpaceIdx, setSelectedSpaceIdx] = useState<number | null>(null)
  const [selectedDialogueId, setSelectedDialogueId] = useState<string | null>(null)
  const [positionMode, setPositionMode] = useState(false)

  useEffect(() => {
    if (currentTask) {
      console.log('[EditorPage] 切换到任务:', currentTask.title)
      const newLayout = defaultLayout()
      setLayout(newLayout)
      setSelectedPanelId(null)
      setSelectedSpaceIdx(null)
      setSelectedDialogueId(null)
      setPositionMode(false)
      clearLayoutHistory()
      addLayoutHistory(newLayout)
    }
  }, [currentTaskId, currentTask, defaultLayout, clearLayoutHistory, addLayoutHistory])

  const sortedLayout = useMemo(
    () => [...layout].sort((a, b) => a.order - b.order),
    [layout]
  )

  const usedPanelIds = useMemo(
    () => new Set(layout.map(l => l.panelId)),
    [layout]
  )

  const usedDialogueIds = useMemo(
    () => new Set(layout.flatMap(l => l.dialogues.map(d => d.id))),
    [layout]
  )

  const progress = useMemo(() => {
    if (!currentTask) return 0
    const used = layout.length
    const required = currentTask.requiredPanels
    return Math.min(100, (used / required) * 100)
  }, [layout.length, currentTask])

  const currentTips: TipItem[] = useMemo(() => {
    if (positionMode && selectedPanelId && selectedDialogueId) {
      return [{
        type: 'info',
        title: '调整对白位置',
        content: '点击画格内的任意位置放置对白气泡。点击快捷位置按钮可快速调整。'
      }]
    }
    if (selectedPanelId) {
      const record = layout.find(l => l.panelId === selectedPanelId)
      if (!record) return []
      const tips: TipItem[] = []
      if (record.marginTop < 30 && record.order > 0) {
        tips.push({
          type: 'warning',
          title: '前留白偏短',
          content: '当前这一格前面的留白可能不够，读者可能来不及反应就进入了画面。如果这是关键镜头，建议增加前留白到60以上。'
        })
      }
      if (record.dialogues.length > 1) {
        tips.push({
          type: 'warning',
          title: '对白较多',
          content: '这一格放置了多条对白，注意不要覆盖关键画面。可以点击"调整位置"来摆放对白。'
        })
      }
      if (tips.length === 0) {
        tips.push({
          type: 'success',
          title: '排版良好',
          content: '这一格的留白和对白搭配合理，节奏把控不错！点击"上移"或"下移"可以调整顺序。'
        })
      }
      return tips
    }
    if (selectedSpaceIdx !== null) {
      const tips: TipItem[] = [{
        type: 'info',
        title: '留白说明',
        content: '点击下方按钮调整留白大小。留白越大，读者在这两格之间停留的时间感越强。悬疑类可以留白大些，战斗类要留白小些。'
      }]
      return tips
    }
    return []
  }, [selectedPanelId, selectedSpaceIdx, layout, positionMode, selectedDialogueId])

  const saveHistory = useCallback((newLayout: LayoutRecord[]) => {
    addLayoutHistory(newLayout)
  }, [addLayoutHistory])

  const handlePanelClick = (panelId: string) => {
    console.log('[EditorPage] 点击画格:', panelId)
    if (positionMode) return
    if (usedPanelIds.has(panelId)) {
      setSelectedPanelId(panelId)
      setSelectedSpaceIdx(null)
      setSelectedDialogueId(null)
    } else {
      if (!currentTask || layout.length >= currentTask.requiredPanels) {
        Taro.showToast({ title: '画格数量已满', icon: 'none' })
        return
      }
      const newRecord: LayoutRecord = {
        panelId,
        order: layout.length,
        marginTop: 40,
        marginBottom: 40,
        dialogues: [],
        modifiedAt: Date.now()
      }
      const newLayout = [...layout, newRecord]
      setLayout(newLayout)
      saveHistory(newLayout)
    }
  }

  const handleDialogueClick = (dialogue: DialogueItem) => {
    console.log('[EditorPage] 点击对白:', dialogue.id)
    if (!selectedPanelId) {
      Taro.showToast({ title: '请先选择画格', icon: 'none' })
      return
    }
    if (usedDialogueIds.has(dialogue.id)) {
      const newLayout = layout.map(r => {
        if (r.panelId !== selectedPanelId) return {
          ...r,
          dialogues: r.dialogues.filter(d => d.id !== dialogue.id),
          modifiedAt: Date.now()
        }
        return {
          ...r,
          dialogues: r.dialogues.filter(d => d.id !== dialogue.id),
          modifiedAt: Date.now()
        }
      })
      setLayout(newLayout)
      saveHistory(newLayout)
      setSelectedDialogueId(null)
      setPositionMode(false)
      return
    }
    const newDialogue: DialogueItem = {
      ...dialogue,
      position: { x: 50, y: 25 }
    }
    const newLayout = layout.map(r => {
      if (r.panelId !== selectedPanelId) return r
      return {
        ...r,
        dialogues: [...r.dialogues, newDialogue],
        modifiedAt: Date.now()
      }
    })
    setLayout(newLayout)
    saveHistory(newLayout)
    setSelectedDialogueId(dialogue.id)
    setPositionMode(true)
  }

  const handlePanelDialogueClick = (dialogueId: string) => {
    console.log('[EditorPage] 点击画格内对白:', dialogueId)
    if (!selectedPanelId) return
    setSelectedDialogueId(dialogueId)
    setPositionMode(true)
  }

  const setDialoguePosition = (x: number, y: number) => {
    if (!selectedPanelId || !selectedDialogueId) return
    console.log('[EditorPage] 设置对白位置:', x, y)
    const newLayout = layout.map(r => {
      if (r.panelId !== selectedPanelId) return r
      return {
        ...r,
        dialogues: r.dialogues.map(d =>
          d.id === selectedDialogueId
            ? { ...d, position: { x, y } }
            : d
        ),
        modifiedAt: Date.now()
      }
    })
    setLayout(newLayout)
  }

  const quickPosition = (pos: string) => {
    if (!selectedPanelId || !selectedDialogueId) return
    const positions: Record<string, { x: number; y: number }> = {
      'top': { x: 50, y: 15 },
      'topLeft': { x: 20, y: 15 },
      'topRight': { x: 80, y: 15 },
      'center': { x: 50, y: 50 },
      'bottom': { x: 50, y: 80 },
      'bottomLeft': { x: 20, y: 80 },
      'bottomRight': { x: 80, y: 80 }
    }
    const p = positions[pos] || positions.center
    const newLayout = layout.map(r => {
      if (r.panelId !== selectedPanelId) return r
      return {
        ...r,
        dialogues: r.dialogues.map(d =>
          d.id === selectedDialogueId
            ? { ...d, position: p }
            : d
        ),
        modifiedAt: Date.now()
      }
    })
    setLayout(newLayout)
  }

  const adjustSpace = (delta: number) => {
    if (selectedSpaceIdx === null) return
    const idx = selectedSpaceIdx
    const newLayout = [...layout].sort((a, b) => a.order - b.order)
    if (idx > 0) {
      newLayout[idx - 1] = {
        ...newLayout[idx - 1],
        marginBottom: Math.max(0, newLayout[idx - 1].marginBottom + delta),
        modifiedAt: Date.now()
      }
    }
    if (idx < newLayout.length) {
      newLayout[idx] = {
        ...newLayout[idx],
        marginTop: Math.max(0, newLayout[idx].marginTop + delta),
        modifiedAt: Date.now()
      }
    }
    setLayout(newLayout)
    saveHistory(newLayout)
  }

  const movePanel = (direction: 'up' | 'down') => {
    if (!selectedPanelId) return
    const sorted = [...layout].sort((a, b) => a.order - b.order)
    const currentIdx = sorted.findIndex(r => r.panelId === selectedPanelId)
    if (currentIdx === -1) return
    if (direction === 'up' && currentIdx === 0) {
      Taro.showToast({ title: '已经是第一格了', icon: 'none' })
      return
    }
    if (direction === 'down' && currentIdx === sorted.length - 1) {
      Taro.showToast({ title: '已经是最后一格了', icon: 'none' })
      return
    }
    const targetIdx = direction === 'up' ? currentIdx - 1 : currentIdx + 1
    const newLayout = [...sorted]
    const temp = newLayout[currentIdx].order
    newLayout[currentIdx] = {
      ...newLayout[currentIdx],
      order: newLayout[targetIdx].order,
      modifiedAt: Date.now()
    }
    newLayout[targetIdx] = {
      ...newLayout[targetIdx],
      order: temp,
      modifiedAt: Date.now()
    }
    setLayout(newLayout)
    saveHistory(newLayout)
  }

  const removePanel = () => {
    if (!selectedPanelId) return
    Taro.showModal({
      title: '移除画格',
      content: '确定要移除这一格吗？',
      success: (res) => {
        if (res.confirm) {
          const removed = layout.find(l => l.panelId === selectedPanelId)
          const newLayout = layout
            .filter(l => l.panelId !== selectedPanelId)
            .sort((a, b) => a.order - b.order)
            .map((r, idx) => ({
              ...r,
              order: idx,
              modifiedAt: Date.now()
            }))
          if (removed && removed.order < newLayout.length) {
            newLayout[removed.order] = {
              ...newLayout[removed.order],
              marginTop: removed.marginTop,
              marginBottom: removed.marginBottom
            }
          }
          setLayout(newLayout)
          saveHistory(newLayout)
          setSelectedPanelId(null)
        }
      }
    })
  }

  const handleSubmit = () => {
    console.log('[EditorPage] 提交作业')
    if (!currentTask) return
    if (layout.length < currentTask.requiredPanels) {
      Taro.showModal({
        title: '画格数量不足',
        content: `要求${currentTask.requiredPanels}格，当前${layout.length}格，确定提交吗？`,
        success: (res) => {
          if (res.confirm) {
            doSubmit()
          }
        }
      })
      return
    }
    doSubmit()
  }

  const doSubmit = () => {
    if (!currentTask) return
    const now = new Date()
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const newWork = {
      id: `work-${Date.now()}`,
      taskId: currentTask.id,
      taskTitle: currentTask.title,
      mood: currentTask.mood as MoodType,
      moodLabel: currentTask.moodLabel,
      studentName: '我',
      submittedAt: timeStr,
      status: 'pending' as const,
      finalLayout: JSON.parse(JSON.stringify(layout)),
      layoutHistory: JSON.parse(JSON.stringify(layoutHistory)),
      usedPanels: layout.length
    }
    addWork(newWork)
    Taro.showToast({ title: '提交成功！', icon: 'success' })
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/mywork/index' })
    }, 1500)
  }

  const resetLayout = () => {
    console.log('[EditorPage] 重置排版')
    Taro.showModal({
      title: '确认重置',
      content: '确定要清空当前排版吗？',
      success: (res) => {
        if (res.confirm) {
          const newLayout = defaultLayout()
          setLayout(newLayout)
          setSelectedPanelId(null)
          setSelectedSpaceIdx(null)
          setSelectedDialogueId(null)
          setPositionMode(false)
          clearLayoutHistory()
          addLayoutHistory(newLayout)
        }
      }
    })
  }

  useDidShow(() => {
    if (layout.length === 0 && currentTask) {
      const newLayout = defaultLayout()
      setLayout(newLayout)
      addLayoutHistory(newLayout)
    }
  })

  if (!currentTask) {
    return (
      <View className={styles.page}>
        <View style={{ padding: 100, textAlign: 'center' }}>
          <Text>请先从作业广场选择一个任务</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.taskBar}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text className={styles.taskTitle}>{currentTask.title}</Text>
            <View className={styles.taskMeta}>
              <View className={classnames(styles.moodTag, styles[currentTask.mood])}>
                {currentTask.moodLabel}
              </View>
              <Text className={styles.require}>
                需要 {currentTask.requiredPanels} 格{currentTask.endingCardPoint ? ' · 结尾卡点' : ''}
              </Text>
            </View>
          </View>
          <Button
            className={styles.taskSwitchBtn}
            onClick={() => Taro.switchTab({ url: '/pages/tasks/index' })}
          >
            <Text>换任务</Text>
          </Button>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>可用画格</Text>
          <Text className={styles.sectionHint}>点击添加到画布</Text>
        </View>
        <ScrollView scrollX className={styles.availablePanels}>
          {currentTask.panels.map(panel => (
            <View key={panel.id} className={classnames(styles.miniPanelWrap, usedPanelIds.has(panel.id) && styles.miniPanelUsed)}>
              <ComicPanel panel={panel} mini onClick={() => handlePanelClick(panel.id)} />
              <Text className={styles.panelDesc}>{panel.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>对白文本</Text>
          <Text className={styles.sectionHint}>
            {selectedPanelId ? '点击对白添加到选中画格' : '请先选择画布中的画格'}
          </Text>
        </View>
        <View className={styles.dialoguePool}>
          {currentTask.dialogues.map(d => (
            <View
              key={d.id}
              className={classnames(
                styles.dialogueChip,
                usedDialogueIds.has(d.id) && styles.used,
                selectedDialogueId === d.id && styles.active
              )}
              onClick={() => handleDialogueClick(d)}
            >
              <Text>{d.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>竖向画布</Text>
          <Text className={styles.sectionHint}>
            {positionMode ? '点击画格内位置放置对白' : '点击画格或留白调整'}
          </Text>
        </View>
        <View className={styles.canvasArea}>
          {sortedLayout.map((record, idx) => {
            const panel = currentTask!.panels.find(p => p.id === record.panelId)
            return (
              <View key={record.panelId} className={styles.layoutItem}>
                <ComicPanel
                  panel={panel}
                  index={idx}
                  selected={selectedPanelId === record.panelId}
                  dialogues={record.dialogues}
                  onClick={() => {
                    if (positionMode && selectedDialogueId) {
                      return
                    }
                    setSelectedPanelId(record.panelId)
                    setSelectedSpaceIdx(null)
                    setSelectedDialogueId(null)
                    setPositionMode(false)
                  }}
                  onDialogueClick={handlePanelDialogueClick}
                  selectedDialogueId={selectedDialogueId}
                />
                {positionMode && selectedDialogueId && selectedPanelId === record.panelId && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 20
                    }}
                    onClick={(e) => {
                      const rect = (e.currentTarget as any).getBoundingClientRect?.()
                      const touch = e.touches?.[0] || e.changedTouches?.[0]
                      if (touch && rect) {
                        const x = Math.round(((touch.clientX - rect.left) / rect.width) * 100)
                        const y = Math.round(((touch.clientY - rect.top) / rect.height) * 100)
                        setDialoguePosition(
                          Math.max(10, Math.min(90, x)),
                          Math.max(10, Math.min(90, y))
                        )
                      }
                    }}
                  />
                )}
                {idx < sortedLayout.length - 1 && (
                  <View
                    className={classnames(styles.spaceArea, {
                      [styles.active]: selectedSpaceIdx === idx + 1
                    })}
                    style={{ height: `${record.marginBottom}rpx` }}
                    onClick={() => {
                      if (positionMode) return
                      setSelectedSpaceIdx(idx + 1)
                      setSelectedPanelId(null)
                      setSelectedDialogueId(null)
                    }}
                  >
                    <Text className={styles.spaceLabel}>{record.marginBottom}rpx</Text>
                  </View>
                )}
              </View>
            )
          })}
        </View>

        {positionMode && (
          <View className={styles.controlsRow}>
            <Button className={styles.controlBtn} onClick={() => quickPosition('topLeft')}>
              <Text>↖ 左上</Text>
            </Button>
            <Button className={styles.controlBtn} onClick={() => quickPosition('top')}>
              <Text>↑ 上</Text>
            </Button>
            <Button className={styles.controlBtn} onClick={() => quickPosition('topRight')}>
              <Text>↗ 右上</Text>
            </Button>
            <Button className={styles.controlBtn} onClick={() => quickPosition('center')}>
              <Text>⊙ 中</Text>
            </Button>
          </View>
        )}
        {positionMode && (
          <View className={styles.controlsRow}>
            <Button className={styles.controlBtn} onClick={() => quickPosition('bottomLeft')}>
              <Text>↙ 左下</Text>
            </Button>
            <Button className={styles.controlBtn} onClick={() => quickPosition('bottom')}>
              <Text>↓ 下</Text>
            </Button>
            <Button className={styles.controlBtn} onClick={() => quickPosition('bottomRight')}>
              <Text>↘ 右下</Text>
            </Button>
            <Button
              className={classnames(styles.controlBtn, styles.controlBtnActive)}
              onClick={() => {
                setPositionMode(false)
                setSelectedDialogueId(null)
              }}
            >
              <Text>✓ 完成</Text>
            </Button>
          </View>
        )}

        {selectedPanelId && !positionMode && (
          <View className={styles.controlsRow}>
            <Button
              className={styles.controlBtn}
              onClick={() => movePanel('up')}
            >
              <Text>↑ 上移</Text>
            </Button>
            <Button
              className={styles.controlBtn}
              onClick={() => movePanel('down')}
            >
              <Text>↓ 下移</Text>
            </Button>
            <Button
              className={classnames(styles.controlBtn, layout.find(l => l.panelId === selectedPanelId)?.dialogues.length! > 0 && styles.controlBtnActive)}
              onClick={() => {
                const rec = layout.find(l => l.panelId === selectedPanelId)
                if (rec && rec.dialogues.length > 0) {
                  setSelectedDialogueId(rec.dialogues[0].id)
                  setPositionMode(true)
                } else {
                  Taro.showToast({ title: '请先添加对白', icon: 'none' })
                }
              }}
            >
              <Text>🎯 调位置</Text>
            </Button>
            <Button
              className={classnames(styles.controlBtn, { [styles.dangerBtn]: true })}
              onClick={removePanel}
            >
              <Text>✕ 移除</Text>
            </Button>
          </View>
        )}

        {selectedSpaceIdx !== null && (
          <View className={styles.controlsRow}>
            <Button className={styles.controlBtn} onClick={() => adjustSpace(-20)}>
              <Text>留白 -20</Text>
            </Button>
            <Button
              className={classnames(styles.controlBtn, styles.controlBtnActive)}
              onClick={() => adjustSpace(-10)}
            >
              <Text>留白 -10</Text>
            </Button>
            <Button
              className={classnames(styles.controlBtn, styles.controlBtnActive)}
              onClick={() => adjustSpace(10)}
            >
              <Text>留白 +10</Text>
            </Button>
            <Button className={styles.controlBtn} onClick={() => adjustSpace(20)}>
              <Text>留白 +20</Text>
            </Button>
          </View>
        )}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>预览与提示</Text>
        </View>
        <View className={styles.previewAndTips}>
          <View className={styles.previewCol}>
            <PhonePreview panels={currentTask.panels} layout={layout} />
          </View>
          <View className={styles.tipsCol}>
            <TipPanel tips={currentTips} />
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.progressInfo}>
          <Text className={styles.progressText}>
            进度 {layout.length}/{currentTask.requiredPanels} 格 · {layoutHistory.length} 次修改
          </Text>
          <View className={styles.progressBar}>
            <View className={styles.progressFill} style={{ width: `${progress}%` }} />
          </View>
        </View>
        <Button className={classnames(styles.btn, styles.btnGhost)} onClick={resetLayout}>
          <Text>重置</Text>
        </Button>
        <Button className={styles.btn} onClick={handleSubmit}>
          <Text>提交作业</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

export default EditorPage
