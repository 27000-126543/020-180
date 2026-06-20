import React, { useState, useMemo } from 'react'
import { View, Text, Button } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { mockWorks } from '@/data/mockWorks'
import WorkCard from '@/components/WorkCard'

type FilterType = 'all' | 'pending' | 'reviewed'

const MyWorkPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredWorks = useMemo(() => {
    if (filter === 'all') return mockWorks
    return mockWorks.filter(w => w.status === filter)
  }, [filter])

  const stats = useMemo(() => {
    const reviewed = mockWorks.filter(w => w.status === 'reviewed')
    const avg = reviewed.length > 0
      ? Math.round(reviewed.reduce((sum, w) => sum + (w.score || 0), 0) / reviewed.length)
      : 0
    return {
      total: mockWorks.length,
      reviewed: reviewed.length,
      pending: mockWorks.filter(w => w.status === 'pending').length,
      avgScore: avg
    }
  }, [])

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待点评' },
    { key: 'reviewed', label: '已点评' }
  ]

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.title}>我的作业 📝</Text>
        <Text className={styles.subtitle}>查看你的排版练习成果</Text>
      </View>

      <View className={styles.statCards}>
        <View className={styles.statCard}>
          <View className={styles.statValue}>{stats.total}</View>
          <Text className={styles.statLabel}>提交总数</Text>
        </View>
        <View className={styles.statCard}>
          <View className={classnames(styles.statValue, styles.pendingCount)}>{stats.pending}</View>
          <Text className={styles.statLabel}>待点评</Text>
        </View>
        <View className={styles.statCard}>
          <View className={classnames(styles.statValue, styles.avgScore)}>{stats.avgScore || '-'}</View>
          <Text className={styles.statLabel}>平均分</Text>
        </View>
      </View>

      <View className={styles.filterBar}>
        {filters.map(f => (
          <Button
            key={f.key}
            className={classnames(styles.filterBtn, filter === f.key && styles.active)}
            onClick={() => {
              console.log('[MyWorkPage] 切换筛选:', f.key)
              setFilter(f.key)
            }}
          >
            <Text>{f.label}</Text>
          </Button>
        ))}
      </View>

      <View className={styles.sectionTitle}>
        <View className={styles.sectionDot} />
        <Text>作业列表</Text>
      </View>

      {filteredWorks.length > 0 ? (
        <View className={styles.workList}>
          {filteredWorks.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </View>
      ) : (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>暂无该类型的作业</Text>
        </View>
      )}
    </View>
  )
}

export default MyWorkPage
