import React from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.scss'
import { ComicPanel as ComicPanelType, LayoutRecord } from '@/types/comic'

interface PhonePreviewProps {
  panels: ComicPanelType[]
  layout: LayoutRecord[]
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ panels, layout }) => {
  const sortedLayout = [...layout].sort((a, b) => a.order - b.order)

  return (
    <View className={styles.phone}>
      <View className={styles.notch} />
      <View className={styles.screen}>
        <ScrollView scrollY className={styles.scrollArea}>
          <View className={styles.content}>
            {sortedLayout.map((record) => {
              const panel = panels.find(p => p.id === record.panelId)
              if (!panel) return null
              return (
                <View key={record.panelId}>
                  {record.marginTop > 0 && (
                    <View style={{ height: `${record.marginTop * 0.3}rpx` }} />
                  )}
                  <View className={styles.panelSlot}>
                    <Image
                      className={styles.panelImg}
                      src={panel.imageUrl}
                      mode="widthFix"
                      onError={(e) => console.error('[PhonePreview] 图片加载失败:', e)}
                    />
                  </View>
                  {record.dialogues.map(d => (
                    <View key={d.id} className={styles.dialogueInPreview}>
                      <Text>{d.text}</Text>
                    </View>
                  ))}
                </View>
              )
            })}
          </View>
        </ScrollView>
        <Text className={styles.label}>手机预览</Text>
      </View>
    </View>
  )
}

export default PhonePreview
