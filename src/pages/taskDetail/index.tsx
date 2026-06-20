import React, { useMemo } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import styles from './index.module.scss'
import { mockTasks } from '@/data/mockTasks'

const TaskDetailPage: React.FC = () => {
  const router = useRouter()
  const taskId = router.params.id || 'task-001'

  const task = useMemo(() => {
    return mockTasks.find(t => t.id === taskId) || mockTasks[0]
  }, [taskId])

  const handleStart = () => {
    console.log('[TaskDetail] 开始练习:', task.id)
    Taro.switchTab({
      url: '/pages/editor/index'
    })
  }

  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count)
  }

  return (
    <View className={styles.page}>
      <View className={styles.hero}>
        <View className={styles.moodBadge}>
          <Text>{task.moodLabel}</Text>
        </View>
        <Text className={styles.title}>{task.title}</Text>
        <Text className={styles.description}>{task.description}</Text>
      </View>

      <View className={styles.content}>
        <View className={styles.card}>
          <View className={styles.cardTitle}>
            <View className={styles.cardIcon} />
            <Text>任务要求</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>难度等级</Text>
            <Text className={styles.infoValue}>{renderStars(task.difficulty)}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>画格数量</Text>
            <Text className={styles.infoValue}>需使用 {task.requiredPanels} 格</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>结尾卡点</Text>
            <Text className={styles.infoValue}>{task.endingCardPoint ? '是' : '否'}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>出题老师</Text>
            <Text className={styles.infoValue}>{task.teacherName}</Text>
          </View>
          {task.deadline && (
            <View className={styles.infoRow}>
              <Text className={styles.infoLabel}>截止日期</Text>
              <Text className={styles.infoValue}>{task.deadline}</Text>
            </View>
          )}
        </View>

        <View className={styles.card}>
          <View className={styles.cardTitle}>
            <View className={styles.cardIcon} />
            <Text>老师提示</Text>
          </View>
          <View className={styles.tipList}>
            {task.tips.map((tip, idx) => (
              <View key={idx} className={styles.tipItem}>
                <View className={styles.tipDot} />
                <Text className={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.card}>
          <View className={styles.cardTitle}>
            <View className={styles.cardIcon} />
            <Text>可用画格预览</Text>
          </View>
          <View className={styles.previewGrid}>
            {task.panels.slice(0, 6).map(panel => (
              <View key={panel.id} className={styles.previewItem}>
                <Image
                  className={styles.previewImg}
                  src={panel.imageUrl}
                  mode="aspectFill"
                  onError={(e) => console.error('[TaskDetail] 图片加载失败:', e)}
                />
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.startBtn} onClick={handleStart}>
          <Text>开始排版练习</Text>
        </Button>
      </View>
    </View>
  )
}

export default TaskDetailPage
