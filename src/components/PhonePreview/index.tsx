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
                <View key={record.panelId} style={{ position: 'relative' }}>
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
                    {record.dialogues.length > 0 && (
                      <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                      }}>
                        {record.dialogues.map((d, i) => (
                          <View
                            key={d.id}
                            className={styles.dialogueBubble}
                            style={{
                              left: `${d.position?.x || 50}%`,
                              top: `${d.position?.y || 20 + i * 25}%`
                            }}
                          >
                            <Text className={styles.dialogueText}>{d.text}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
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
