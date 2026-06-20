import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.module.scss'
import { ComicPanel as ComicPanelType, DialogueItem } from '@/types/comic'
import DialogueBubble from '@/components/DialogueBubble'

interface ComicPanelProps {
  panel?: ComicPanelType
  index?: number
  selected?: boolean
  isDragging?: boolean
  dialogues?: DialogueItem[]
  onClick?: () => void
  mini?: boolean
  placeholder?: boolean
  placeholderText?: string
  onDialogueClick?: (dialogueId: string) => void
  selectedDialogueId?: string
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
  placeholderText,
  onDialogueClick,
  selectedDialogueId
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
            <View
              key={d.id}
              className={classnames(
                styles.dialogueWrapper,
                selectedDialogueId === d.id && styles.dialogueSelected
              )}
              onClick={(e) => {
                e.stopPropagation()
                if (onDialogueClick) {
                  onDialogueClick(d.id)
                }
              }}
            >
              <DialogueBubble
                text={d.text}
                position={d.position || { x: 50, y: 20 + i * 25 }}
                mini={mini}
              />
              {selectedDialogueId === d.id && (
                <View className={styles.positionHandle} style={{
                  left: `${d.position?.x || 50}%`,
                  top: `${d.position?.y || 20}%`
                }} />
              )}
            </View>
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
