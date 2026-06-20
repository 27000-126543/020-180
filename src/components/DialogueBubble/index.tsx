import React from 'react'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'

interface DialogueBubbleProps {
  text: string
  position?: { x: number; y: number }
  mini?: boolean
}

const DialogueBubble: React.FC<DialogueBubbleProps> = ({ text, position, mini }) => {
  const style: React.CSSProperties = {}
  if (position) {
    style.left = `${position.x}%`
    style.top = `${position.y}%`
  }

  return (
    <View
      className={classnames(styles.bubble, mini && styles.mini)}
      style={style}
    >
      <Text className={styles.text}>{text}</Text>
      <View className={styles.tail} />
    </View>
  )
}

export default DialogueBubble
