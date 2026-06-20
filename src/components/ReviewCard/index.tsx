import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { SubmittedWork } from '@/types/comic'

interface ReviewCardProps {
  work: SubmittedWork
}

const ReviewCard: React.FC<ReviewCardProps> = ({ work }) => {
  const handleClick = () => {
    console.log('[ReviewCard] 点击点评:', work.id)
    Taro.navigateTo({
      url: `/pages/workDetail/index?id=${work.id}`
    })
  }

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <View className={styles.studentInfo}>
          <Text className={styles.studentName}>{work.studentName}</Text>
          <Text className={styles.taskTitle}>{work.taskTitle}</Text>
        </View>
        {work.score !== undefined && (
          <View className={styles.score}>
            <Text>{work.score}</Text>
          </View>
        )}
      </View>
      <View className={styles.meta}>
        <View className={classnames(styles.moodTag, styles[work.mood])}>
          {work.moodLabel}
        </View>
        <Text>提交于 {work.submittedAt}</Text>
        <View className={styles.historyTag}>
          <Text>{work.layoutHistory.length} 次修改</Text>
        </View>
      </View>
      {work.teacherComment && (
        <View className={styles.commentSection}>
          <Text className={styles.commentLabel}>老师点评</Text>
          <Text className={styles.commentText}>{work.teacherComment}</Text>
        </View>
      )}
    </View>
  )
}

export default ReviewCard
