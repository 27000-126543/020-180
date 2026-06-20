import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { ComicPanel as ComicPanelType } from '@/types/comic'
import DialogueBubble from '@/components/DialogueBubble'

interface ComicPanelProps {
  panel?: ComicPanelType
  index?: number
  selected?: boolean
  isDragging?: boolean
  dialogues?: { id: string; text: string }[]
  onClick?: () => void
  mini?: boolean
  placeholder?: boolean
  placeholderText?: string
}

const ComicPanel: React.FC<ComicPanelProps> = ({
  panel,
  index,
  selected,
  isDragging,
  dialogues = [],
  onClick,
  mini,
  placeholder,
  placeholderText
}) => {
  if (placeholder) {
    return (
      <View className={classnames(styles.panelWrap, mini && styles.miniPanel)} onClick={onClick}>
        <View className={styles.placeholder}>
          <Text className={styles.placeholderText}>{placeholderText || '点击选择画格'}</Text>
        </View>
      </View>
    )
  }

  if (!panel) return null

  return (
    <View
      className={classnames(
        styles.panelWrap,
        selected && styles.selected,
        mini && styles.miniPanel
      )}
      onClick={onClick}
    >
      {index !== undefined && (
        <View className={styles.panelIndex}>
          <Text>{index + 1}</Text>
        </View>
      )}
      <Image
        className={styles.panelImage}
        src={panel.imageUrl}
        mode="widthFix"
        onError={(e) => console.error('[ComicPanel] 图片加载失败:', e)}
      />
      {dialogues.length > 0 && (
        <View className={styles.dialogues}>
          {dialogues.map((d, i) => (
            <DialogueBubble
              key={d.id}
              text={d.text}
              position={{ x: 50, y: 15 + i * 25 }}
            />
          ))}
        </View>
      )}
      {isDragging && (
        <View className={styles.dragIndicator}>
          <Text className={styles.dragText}>拖拽排序中</Text>
        </View>
      )}
    </View>
  )
}

export default ComicPanel
