import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { mockTasks } from '@/data/mockTasks'
import { mockWorks } from '@/data/mockWorks'
import TaskCard from '@/components/TaskCard'
import { MoodType } from '@/types/comic'

type FilterType = 'all' | MoodType

const TasksPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'suspense', label: '悬疑铺垫' },
    { key: 'romance', label: '恋爱心动' },
    { key: 'action', label: '战斗爆发' }
  ]

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') return mockTasks
    return mockTasks.filter(t => t.mood === activeFilter)
  }, [activeFilter])

  const stats = useMemo(() => {
    return {
      total: mockTasks.length,
      submitted: mockWorks.length
    }
  }, [])

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.title}>作业广场 🎨</Text>
        <Text className={styles.subtitle}>选择一个任务，开始你的条漫排版练习</Text>
      </View>

      <View className={styles.statBar}>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.total}</Text>
          <Text className={styles.statLabel}>可接任务</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.submitted}</Text>
          <Text className={styles.statLabel}>已提交</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>3</Text>
          <Text className={styles.statLabel}>待点评</Text>
        </View>
      </View>

      <ScrollView scrollX className={styles.filterBar}>
        {filters.map(f => (
          <View
            key={f.key}
            className={classnames(styles.filterTag, activeFilter === f.key && styles.active)}
            onClick={() => {
              console.log('[TasksPage] 切换筛选:', f.key)
              setActiveFilter(f.key)
            }}
          >
            <Text>{f.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View className={styles.sectionTitle}>
        <View className={styles.sectionDot} />
        <Text>任务列表</Text>
      </View>

      {filteredTasks.length > 0 ? (
        <View className={styles.taskList}>
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      ) : (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>暂无该类型的任务</Text>
        </View>
      )}
    </View>
  )
}

export default TasksPage
