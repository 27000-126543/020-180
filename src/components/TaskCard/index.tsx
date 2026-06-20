import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.scss'
import { TaskTemplate } from '@/types/comic'

interface TaskCardProps {
  task: TaskTemplate
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const handleClick = () => {
    console.log('[TaskCard] 点击任务:', task.id)
    Taro.navigateTo({
      url: `/pages/taskDetail/index?id=${task.id}`
    })
  }

  const renderStars = () => {
    return (
      <View className={styles.difficulty}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            className={classnames(styles.star, i <= task.difficulty && styles.active)}
          />
        ))}
      </View>
    )
  }

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <Text className={styles.title}>{task.title}</Text>
        <View className={classnames(styles.moodTag, styles[task.mood])}>
          {task.moodLabel}
        </View>
      </View>
      <Text className={styles.description}>{task.description}</Text>
      <View className={styles.meta}>
        <View className={styles.metaLeft}>
          <View className={styles.metaItem}>
            <Text className={styles.metaLabel}>难度</Text>
            {renderStars()}
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaLabel}>需</Text>
            <Text className={styles.metaValue}>{task.requiredPanels}格</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaLabel}>by</Text>
            <Text className={styles.metaValue}>{task.teacherName}</Text>
          </View>
        </View>
        {task.deadline && (
          <Text className={styles.deadline}>截止 {task.deadline}</Text>
        )}
      </View>
    </View>
  )
}

export default TaskCard
