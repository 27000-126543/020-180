import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { mockWorks } from '@/data/mockWorks'
import ReviewCard from '@/components/ReviewCard'
import { MoodType } from '@/types/comic'

type FilterType = 'all' | MoodType

const ReviewsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all')

  const reviewedWorks = useMemo(() => mockWorks.filter(w => w.status === 'reviewed'), [])

  const filteredWorks = useMemo(() => {
    if (filter === 'all') return reviewedWorks
    return reviewedWorks.filter(w => w.mood === filter)
  }, [filter, reviewedWorks])

  const stats = useMemo(() => {
    const scores = reviewedWorks.map(w => w.score || 0)
    const avg = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0
    const totalModifications = reviewedWorks.reduce((sum, w) => sum + w.layoutHistory.length, 0)
    return {
      avgScore: avg,
      reviewed: reviewedWorks.length,
      modifications: totalModifications
    }
  }, [reviewedWorks])

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部点评' },
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
        <Text>点评列表</Text>
      </View>

      {filteredWorks.length > 0 ? (
        <View className={styles.list}>
          {filteredWorks.map(work => (
            <ReviewCard key={work.id} work={work} />
          ))}
        </View>
      ) : (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>暂无点评内容</Text>
        </View>
      )}
    </View>
  )
}

export default ReviewsPage
