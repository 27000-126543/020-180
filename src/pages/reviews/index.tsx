import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useAppContext } from '@/store/AppContext'
import ReviewCard from '@/components/ReviewCard'
import { MoodType } from '@/types/comic'

type FilterType = 'all' | MoodType | 'pending'

const ReviewsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all')
  const { works } = useAppContext()

  console.log('[ReviewsPage] 作业总数:', works.length)

  const reviewedWorks = useMemo(() => works.filter(w => w.status === 'reviewed'), [works])
  const pendingWorks = useMemo(() => works.filter(w => w.status === 'pending'), [works])

  const filteredWorks = useMemo(() => {
    if (filter === 'all') return works
    if (filter === 'pending') return pendingWorks
    return works.filter(w => w.mood === filter)
  }, [filter, works, pendingWorks])

  const stats = useMemo(() => {
    const scores = reviewedWorks.map(w => w.score || 0)
    const avg = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0
    const totalModifications = works.reduce((sum, w) => sum + w.layoutHistory.length, 0)
    return {
      avgScore: avg,
      reviewed: reviewedWorks.length,
      pending: pendingWorks.length,
      modifications: totalModifications
    }
  }, [works, reviewedWorks, pendingWorks])

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待点评' },
    { key: 'suspense', label: '悬疑铺垫' },
    { key: 'romance', label: '恋爱心动' },
    { key: 'action', label: '战斗爆发' }
  ]

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.title}>点评中心 💬</Text>
        <Text className={styles.subtitle}>查看老师的专业点评与修改建议</Text>
      </View>

      <View className={styles.statRow}>
        <View className={styles.statItem}>
          <View className={styles.statTop}>
            <Text className={classnames(styles.statValue, styles.teacher)}>{stats.avgScore || '-'}</Text>
            <Text className={styles.statUnit}>分</Text>
          </View>
          <Text className={styles.statLabel}>平均得分</Text>
        </View>
        <View className={styles.statItem}>
          <View className={styles.statTop}>
            <Text className={styles.statValue}>{stats.reviewed}</Text>
            <Text className={styles.statUnit}>份</Text>
          </View>
          <Text className={styles.statLabel}>已点评</Text>
        </View>
        <View className={styles.statItem}>
          <View className={styles.statTop}>
            <Text className={classnames(styles.statValue, styles.pending)}>{stats.pending}</Text>
            <Text className={styles.statUnit}>份</Text>
          </View>
          <Text className={styles.statLabel}>待点评</Text>
        </View>
        <View className={styles.statItem}>
          <View className={styles.statTop}>
            <Text className={classnames(styles.statValue, styles.pending)}>{stats.modifications}</Text>
            <Text className={styles.statUnit}>次</Text>
          </View>
          <Text className={styles.statLabel}>修改记录</Text>
        </View>
      </View>

      <ScrollView scrollX className={styles.filterTabs}>
        {filters.map(f => (
          <View
            key={f.key}
            className={classnames(styles.tab, filter === f.key && styles.active)}
            onClick={() => {
              console.log('[ReviewsPage] 切换筛选:', f.key)
              setFilter(f.key)
            }}
          >
            <Text>{f.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View className={styles.sectionTitle}>
        <View className={styles.sectionDot} />
        <Text>作业列表</Text>
      </View>

      {filteredWorks.length > 0 ? (
        <View className={styles.list}>
          {filteredWorks.map(work => (
            <ReviewCard key={work.id} work={work} />
          ))}
        </View>
      ) : (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>暂无内容</Text>
        </View>
      )}
    </View>
  )
}

export default ReviewsPage
