import React, { useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { mockWorks } from '@/data/mockWorks'
import { mockTasks } from '@/data/mockTasks'

const WorkDetailPage: React.FC = () => {
  const router = useRouter()
  const workId = router.params.id || 'work-001'

  const work = useMemo(() => {
    return mockWorks.find(w => w.id === workId) || mockWorks[0]
  }, [workId])

  const task = useMemo(() => {
    return mockTasks.find(t => t.id === work.taskId)
  }, [work])

  const finalPanels = useMemo(() => {
    if (!task) return []
    return work.finalLayout
      .sort((a, b) => a.order - b.order)
      .map(record => ({
        record,
        panel: task.panels.find(p => p.id === record.panelId)
      }))
      .filter(item => item.panel)
  }, [work, task])

  if (!task) {
    return (
      <View className={styles.page}>
        <View className={styles.empty}>
          <Text className={styles.emptyText}>作业不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.title}>{work.taskTitle}</Text>
        <View className={styles.metaRow}>
          <View className={classnames(styles.moodTag, styles[work.mood]}>
            <Text>{work.moodLabel}</Text>
          </View>
          <Text className={styles.metaText}>提交于 {work.submittedAt}</Text>
          <Text className={styles.metaText}>使用 {work.usedPanels} 格</Text>
        </View>
      </View>

      <View className={styles.section}>
        {work.status === 'reviewed' && work.score !== undefined ? (
          <View className={styles.scoreCard}>
            <View className={styles.scoreCircle}>
              <Text className={styles.scoreValue}>{work.score}</Text>
              <Text className={styles.scoreLabel}>得分</Text>
            </View>
            <View className={styles.scoreInfo}>
              <Text className={styles.scoreTitle}>老师已点评</Text>
              <Text className={styles.scoreDesc}>共进行了 {work.layoutHistory.length} 次修改，排版节奏把控良好</Text>
            </View>
          </View>
        ) : (
          <View className={styles.pendingCard}>
            <View className={styles.pendingIcon}>⏳</View>
            <Text className={styles.pendingText}>等待老师点评中...</Text>
            <Text className={styles.pendingHint}>老师通常会在24小时内完成点评</Text>
          </View>
        )}
      </View>

      {work.status === 'reviewed' && work.teacherComment && (
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>老师点评</Text>
          <View className={styles.commentCard}>
            <View className={styles.commentLabel}>
              <View className={styles.teacherDot} />
              <Text>{task.teacherName}</Text>
            </View>
            <Text className={styles.commentText}>{work.teacherComment}</Text>
          </View>
        </View>
      )}

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>排版修改历史 ({work.layoutHistory.length} 次)</Text>
        <View className={styles.historyCard}>
          {work.layoutHistory.map((history, idx) => (
            <View key={idx} className={styles.historyItem}>
              <View className={styles.historyIndex}>
                <Text>{idx + 1}</Text>
              </View>
              <View className={styles.historyContent}>
                <Text className={styles.historyTitle}>
                  第 {idx + 1} 版
                  {idx === work.layoutHistory.length - 1 ? '（最终版）' : ''}
                </Text>
                <Text className={styles.historyMeta}>
                  使用 {history.length} 个画格 · {history.flatMap(h => h.dialogues).length} 条对白
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>最终排版效果</Text>
        <View className={styles.previewList}>
          {finalPanels.map((item, idx) => (
            <View key={item.record.panelId} className={styles.previewItem}>
              <Text className={styles.previewIndex}>第 {idx + 1} 格</Text>
              {item.panel && (
                <View className={styles.previewImg}>
                  <Image
                    src={item.panel.imageUrl}
                    mode="widthFix"
                    onError={(e) => console.error('[WorkDetail] 图片加载失败:', e)}
                    style={{ width: '100%', display: 'block' }}
                  />
                </View>
              )}
              {item.record.dialogues.length > 0 && (
                <View style={{ marginTop: '16rpx' }}>
                  {item.record.dialogues.map(d => (
                    <Text
                      key={d.id}
                      style={{
                        display: 'block',
                        fontSize: '24rpx',
                        color: '#4E5969',
                        background: '#FFF8F3',
                        padding: '8rpx 16rpx',
                        borderRadius: '8rpx',
                        marginBottom: '8rpx'
                      }}
                    >
                      💬 {d.text}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default WorkDetailPage
