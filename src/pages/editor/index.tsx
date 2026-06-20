import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { mockTasks } from '@/data/mockTasks'
import ComicPanel from '@/components/ComicPanel'
import PhonePreview from '@/components/PhonePreview'
import TipPanel from '@/components/TipPanel'
import { LayoutRecord, DialogueItem, TipItem } from '@/types/comic'

const currentTask = mockTasks[0]

const EditorPage: React.FC = () => {
  const defaultLayout: LayoutRecord[] = useMemo(() => {
    return currentTask.panels.slice(0, currentTask.requiredPanels).map((panel, idx) => ({
      panelId: panel.id,
      order: idx,
      marginTop: idx === 0 ? 0 : 40,
      marginBottom: 40,
      dialogues: [],
      modifiedAt: Date.now()
    }))
  }, [])

  const [layout, setLayout] = useState<LayoutRecord[]>(defaultLayout)
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null)
  const [selectedSpaceIdx, setSelectedSpaceIdx] = useState<number | null>(null)

  const sortedLayout = useMemo(() => [...layout].sort((a, b) => a.order - b.order), [layout])

  const usedPanelIds = useMemo(() => new Set(layout.map(l => l.panelId)), [layout])

  const usedDialogueIds = useMemo(
    () => new Set(layout.flatMap(l => l.dialogues.map(d => d.id))),
    [layout]
  )

  const progress = useMemo(() => {
    const used = layout.length
    const required = currentTask.requiredPanels
    return Math.min(100, (used / required) * 100)
  }, [layout.length, currentTask.requiredPanels])

  const currentTips: TipItem[] = useMemo(() => {
    if (selectedPanelId) {
      const record = layout.find(l => l.panelId === selectedPanelId)
      if (!record) return []
      const tips: TipItem[] = []
      if (record.marginTop < 30) {
        tips.push({
          type: 'warning',
          title: '前留白偏短',
          content: '当前这一格前面的留白可能不够，读者可能来不及反应就进入了画面。如果这是关键镜头，建议增加前留白到60以上。'
        })
      }
      if (record.dialogues.length > 1) {
        tips.push({
          type: 'warning',
          title: '对白过多',
          content: '这一格放置了多条对白，可能会抢画面的风头。建议检查是否所有对白都必须放在这一格，或者可以分散到相邻画格。'
        })
      }
      if (tips.length === 0) {
        tips.push({
          type: 'success',
          title: '排版良好',
          content: '这一格的留白和对白搭配合理，节奏把控不错！'
        })
      }
      return tips
    }
    if (selectedSpaceIdx !== null) {
      const tips: TipItem[] = [{
        type: 'info',
        title: '留白说明',
        content: '点击下方按钮调整留白大小。留白越大，读者在这两格之间停留的时间感越强。'
      }]
      return tips
    }
    return []
  }, [selectedPanelId, selectedSpaceIdx, layout])

  const handlePanelClick = (panelId: string) => {
    console.log('[EditorPage] 选择画格:', panelId)
    if (usedPanelIds.has(panelId)) {
      setSelectedPanelId(panelId)
      setSelectedSpaceIdx(null)
    } else {
      if (layout.length >= currentTask.requiredPanels) {
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
      setLayout([...layout, newRecord])
    }
  }

  const handleDialogueClick = (dialogue: DialogueItem) => {
    console.log('[EditorPage] 选择对白:', dialogue.id)
    if (!selectedPanelId) {
      Taro.showToast({ title: '请先选择画格', icon: 'none' })
      return
    }
    if (usedDialogueIds.has(dialogue.id)) {
      setLayout(prev => prev.map(r => {
        if (r.panelId !== selectedPanelId) return r
        return {
          ...r,
          dialogues: r.dialogues.filter(d => d.id !== dialogue.id),
          modifiedAt: Date.now()
        }
      }))
      return
    }
    setLayout(prev => prev.map(r => {
      if (r.panelId !== selectedPanelId) return r
      return {
        ...r,
        dialogues: [...r.dialogues, { id: dialogue.id, text: dialogue.text }],
        modifiedAt: Date.now()
      }
    }))
  }

  const adjustSpace = (delta: number) => {
    if (selectedSpaceIdx === null) return
    const idx = selectedSpaceIdx
    setLayout(prev => {
      const next = [...prev]
      if (idx > 0) {
        next[idx - 1] = {
          ...next[idx - 1],
          marginBottom: Math.max(0, next[idx - 1].marginBottom + delta),
          modifiedAt: Date.now()
        }
      }
      if (idx < next.length) {
        next[idx] = {
          ...next[idx],
          marginTop: Math.max(0, next[idx].marginTop + delta),
          modifiedAt: Date.now()
        }
      }
      return next
    })
  }

  const handleSubmit = () => {
    console.log('[EditorPage] 提交作业')
    if (layout.length < currentTask.requiredPanels) {
      Taro.showModal({
        title: '画格数量不足',
        content: `要求${currentTask.requiredPanels}格，当前${layout.length}格，确定提交吗？`,
        success: (res) => {
          if (res.confirm) {
            Taro.showToast({ title: '提交成功！', icon: 'success' })
          }
        }
      })
      return
    }
    Taro.showToast({ title: '提交成功！老师会尽快点评', icon: 'success' })
  }

  const resetLayout = () => {
    console.log('[EditorPage] 重置排版')
    Taro.showModal({
      title: '确认重置',
      content: '确定要清空当前排版吗？',
      success: (res) => {
        if (res.confirm) {
          setLayout(defaultLayout)
          setSelectedPanelId(null)
          setSelectedSpaceIdx(null)
        }
      }
    })
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.taskBar}>
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
          <Text className={styles.sectionHint}>选中画格后点击对白</Text>
        </View>
        <View className={styles.dialoguePool}>
          {currentTask.dialogues.map(d => (
            <View
              key={d.id}
              className={classnames(
                styles.dialogueChip,
                usedDialogueIds.has(d.id) && styles.used
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
          <Text className={styles.sectionHint}>点击画格或留白调整</Text>
        </View>
        <View className={styles.canvasArea}>
          {sortedLayout.map((record, idx) => {
            const panel = currentTask.panels.find(p => p.id === record.panelId)
            return (
              <View key={record.panelId} className={styles.layoutItem}>
                <ComicPanel
                  panel={panel}
                  index={idx}
                  selected={selectedPanelId === record.panelId}
                  dialogues={record.dialogues}
                  onClick={() => {
                    setSelectedPanelId(record.panelId)
                    setSelectedSpaceIdx(null)
                  }}
                />
                {record.dialogues.length > 0 && (
                  <View className={styles.dialogueAssigned}>
                    {record.dialogues.map(d => (
                      <View key={d.id} className={styles.dialogueMini}>
                        <Text>{d.text}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {idx < sortedLayout.length - 1 && (
                  <View
                    className={classnames(styles.spaceArea, {
                      [styles.active]: selectedSpaceIdx === idx + 1
                    })}
                    style={{ height: `${record.marginBottom}rpx` }}
                    onClick={() => {
                      setSelectedSpaceIdx(idx + 1)
                      setSelectedPanelId(null)
                    }}
                  >
                    <Text className={styles.spaceLabel}>{record.marginBottom}rpx</Text>
                  </View>
                )}
              </View>
            )
          })}
        </View>
        {selectedSpaceIdx !== null && (
          <View className={styles.controlsRow}>
            <Button className={styles.controlBtn} onClick={() => adjustSpace(-20)}>
              <Text>留白 -20</Text>
            </Button>
            <Button className={classnames(styles.controlBtn, styles.controlBtnActive)} onClick={() => adjustSpace(-10)}>
              <Text>留白 -10</Text>
            </Button>
            <Button className={classnames(styles.controlBtn, styles.controlBtnActive)} onClick={() => adjustSpace(10)}>
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
            进度 {layout.length}/{currentTask.requiredPanels} 格
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
