import React from 'react'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { TipItem } from '@/types/comic'

interface TipPanelProps {
  tips: TipItem[]
  title?: string
}

const TipPanel: React.FC<TipPanelProps> = ({ tips, title = '排版提示' }) => {
  const getIconText = (type: TipItem['type']) => {
    switch (type) {
      case 'warning': return '!'
      case 'success': return '✓'
      default: return 'i'
    }
  }

  if (!tips || tips.length === 0) {
    return (
      <View className={styles.panel}>
        <View className={styles.empty}>
          <Text>选中画格查看排版提示</Text>
        </View>
      </View>
    )
  }

  return (
    <View className={styles.panel}>
      <View className={styles.title}>
        <View className={classnames(styles.titleIcon, styles[tips[0].type])}>
          <Text>{getIconText(tips[0].type)}</Text>
        </View>
        <Text>{title}</Text>
      </View>
      <View className={styles.tipList}>
        {tips.map((tip, idx) => (
          <View key={idx} className={styles.tipItem}>
            <Text className={styles.tipTitle}>{tip.title}</Text>
            <Text className={styles.tipContent}>{tip.content}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default TipPanel
