import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { SubmittedWork } from '@/types/comic'

interface WorkCardProps {
  work: SubmittedWork
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const handleClick = () => {
    console.log('[WorkCard] 点击作业:', work.id)
    Taro.navigateTo({
      url: `/pages/workDetail/index?id=${work.id}`
    })
  }

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <Text className={styles.title}>{work.taskTitle}</Text>
        <View className={classnames(styles.statusTag, styles[work.status])}>
          {work.status === 'pending' ? '待点评' : '已点评'}
        </View>
      </View>
      <View className={styles.meta}>
        <View className={styles.metaLeft}>
          <View className={classnames(styles.moodTag, styles[work.mood])}>
            {work.moodLabel}
          </View>
          <Text className={styles.metaItem}>提交于 {work.submittedAt}</Text>
          <Text className={styles.metaItem}>使用 {work.usedPanels} 格</Text>
        </View>
        {work.status === 'reviewed' && work.score !== undefined && (
          <View className={styles.scoreWrap}>
            <Text className={styles.score}>{work.score}</Text>
            <Text className={styles.scoreUnit}>分</Text>
          </View>
        )}
      </View>
      {work.status === 'reviewed' && work.teacherComment && (
        <Text className={styles.comment}>{work.teacherComment}</Text>
      )}
    </View>
  )
}

export default WorkCard
