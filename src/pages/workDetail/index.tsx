import React, { useMemo } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useAppContext } from '@/store/AppContext'
import { SubmittedWork, LayoutRecord, ComicPanel } from '@/types/comic'

const WorkDetailPage: React.FC = () => {
  const router = useRouter()
  const workId = router.params.id
  const { works, tasks } = useAppContext()

  const work = useMemo(() => {
    return works.find(w => w.id === workId) as SubmittedWork
  }, [works, workId])

  const task = useMemo(() => {
    if (!work) return null
    return tasks.find(t => t.id === work.taskId)
  }, [tasks, work])

  const sortedLayout = useMemo(() => {
    if (!work) return []
    return [...work.finalLayout].sort((a, b) => a.order - b.order)
  }, [work])

  const getPanelById = (panelId: string): ComicPanel | undefined => {
    if (!task) return undefined
    return task.panels.find(p => p.id === panelId)
  }

  if (!work) {
    return (
      <View className={styles.page}>
        <View style={{ padding: 100, textAlign: 'center' }}>
          <Text>作业不存在</Text>
          <Button
            style={{ marginTop: 20 }}
            onClick={() => Taro.navigateBack()}
          >
            <Text>返回</Text>
          </Button>
        </View>
      </View>
    )
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const renderStars = (score: number) => {
    const full = Math.floor(score / 20)
    return '★'.repeat(full) + '☆'.repeat(5 - full)
  }

  const formatHistoryChanges = (layout: LayoutRecord[]) => {
    const panels = layout.length
    const dialogues = layout.reduce((sum, r) => sum + r.dialogues.length, 0)
    return { panels, dialogues }
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.header}>
        <Button className={styles.backBtn} onClick={handleBack}>
          <Text>← 返回</Text>
        </Button>
        <Text className={styles.headerTitle}>作业详情</Text>
        <View style={{ width: 100 }} />
      </View>

      <View className={classnames(styles.hero, styles[work.mood])}>
        <View className={styles.heroTop}>
          <View className={styles.moodBadge}>
            <Text>{work.moodLabel}</Text>
          </View>
          <View className={styles.statusTag}>
            <Text>{work.status === 'reviewed' ? '已点评' : '待点评'}</Text>
          </View>
        </View>
        <Text className={styles.taskTitle}>{work.taskTitle}</Text>
        <Text className={styles.meta}>提交时间：{work.submittedAt}</Text>
      </View>

      {work.status === 'reviewed' && (
        <View className={styles.scoreSection}>
          <View className={styles.scoreCircle}>
            <Text className={styles.scoreNumber}>{work.score}</Text>
            <Text className={styles.scoreLabel}>分</Text>
          </View>
          <Text className={styles.scoreStars}>{work.score !== undefined ? renderStars(work.score) : '—'}</Text>
        </View>
      )}

      {work.status === 'pending' && (
        <View className={styles.pendingSection}>
          <View className={styles.pendingIcon}>⏳</View>
          <Text className={styles.pendingText}>等待老师点评中...</Text>
        </View>
      )}

      {work.teacherComment && (
        <View className={styles.card}>
          <View className={styles.cardTitle}>
            <View className={styles.cardIcon} />
            <Text>老师点评</Text>
          </View>
          <Text className={styles.commentText}>{work.teacherComment}</Text>
        </View>
      )}

      <View className={styles.card}>
        <View className={styles.cardTitle}>
          <View className={styles.cardIcon} />
          <Text>排版修改历史</Text>
        </View>
        <View className={styles.timeline}>
          {work.layoutHistory.map((layout, idx) => {
            const changes = formatHistoryChanges(layout)
            return (
              <View key={idx} className={styles.timelineItem}>
                <View className={styles.timelineDot} />
                <View className={styles.timelineContent}>
                  <Text className={styles.timelineTitle}>修改 {idx + 1}</Text>
                  <Text className={styles.timelineDesc}>
                    {changes.panels} 个画格 · {changes.dialogues} 条对白
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>

      <View className={styles.card}>
        <View className={styles.cardTitle}>
          <View className={styles.cardIcon} />
          <Text>最终排版效果</Text>
        </View>
        <View className={styles.previewArea}>
          {sortedLayout.map((record, idx) => {
            const panel = getPanelById(record.panelId)
            if (!panel) return null
            return (
              <View key={record.panelId} className={styles.previewItem}>
                <View className={styles.previewPanel}>
                  <Image
                    className={styles.previewImg}
                    src={panel.imageUrl}
                    mode="widthFix"
                    onError={(e) => console.error('[WorkDetail] 图片加载失败:', e)}
                  />
                  {record.dialogues.length > 0 && (
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}>
                      {record.dialogues.map((d, i) => (
                        <View
                          key={d.id}
                          className={styles.dialogueBubble}
                          style={{
                            left: `${d.position?.x || 50}%`,
                            top: `${d.position?.y || 20 + i * 25}%`
                          }}
                        >
                          <Text className={styles.dialogueText}>{d.text}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                {idx < sortedLayout.length - 1 && (
                  <View
                    className={styles.previewSpace}
                    style={{ height: `${record.marginBottom}rpx` }}
                  />
                )}
              </View>
            )
          })}
        </View>
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  )
}

export default WorkDetailPage
