import { SubmittedWork } from '@/types/comic'

export const mockWorks: SubmittedWork[] = [
  {
    id: 'work-001',
    taskId: 'task-001',
    taskTitle: '悬疑铺垫：雨夜来访者',
    mood: 'suspense',
    moodLabel: '悬疑铺垫',
    studentName: '小明',
    submittedAt: '2026-06-19 14:30',
    status: 'reviewed',
    score: 92,
    teacherComment: '整体节奏把控得很好！尤其是第3格和第4格之间的留白非常到位，营造出了很强的悬念感。第5格的结尾卡点也很精准。可以改进的地方：第1格和第2格之间的留白稍短，读者可能还没进入氛围就进入了下一个镜头，建议适当增加。另外对白气泡的位置可以再优化一下，第2格的对白有点靠近画面边缘。继续加油！',
    usedPanels: 5,
    finalLayout: [
      { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 80, dialogues: [{ id: 'd4', text: '（雨声）' }], modifiedAt: 1718779200000 },
      { panelId: 'p2', order: 1, marginTop: 80, marginBottom: 120, dialogues: [{ id: 'd1', text: '……这么晚了，会是谁？' }], modifiedAt: 1718779260000 },
      { panelId: 'p3', order: 2, marginTop: 120, marginBottom: 160, dialogues: [{ id: 'd5', text: '我今天来，是有件事想拜托你。' }], modifiedAt: 1718779320000 },
      { panelId: 'p4', order: 3, marginTop: 160, marginBottom: 60, dialogues: [{ id: 'd3', text: '你、你是——！' }], modifiedAt: 1718779380000 },
      { panelId: 'p5', order: 4, marginTop: 60, marginBottom: 200, dialogues: [{ id: 'd2', text: '好久不见。' }], modifiedAt: 1718779440000 }
    ],
    layoutHistory: [
      [
        { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 40, dialogues: [], modifiedAt: 1718779000000 },
        { panelId: 'p2', order: 1, marginTop: 40, marginBottom: 40, dialogues: [], modifiedAt: 1718779000000 },
        { panelId: 'p3', order: 2, marginTop: 40, marginBottom: 40, dialogues: [], modifiedAt: 1718779000000 },
        { panelId: 'p4', order: 3, marginTop: 40, marginBottom: 40, dialogues: [], modifiedAt: 1718779000000 },
        { panelId: 'p5', order: 4, marginTop: 40, marginBottom: 40, dialogues: [], modifiedAt: 1718779000000 }
      ],
      [
        { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 80, dialogues: [], modifiedAt: 1718779200000 },
        { panelId: 'p2', order: 1, marginTop: 80, marginBottom: 120, dialogues: [{ id: 'd1', text: '……这么晚了，会是谁？' }], modifiedAt: 1718779260000 },
        { panelId: 'p3', order: 2, marginTop: 120, marginBottom: 160, dialogues: [{ id: 'd5', text: '我今天来，是有件事想拜托你。' }], modifiedAt: 1718779320000 },
        { panelId: 'p4', order: 3, marginTop: 160, marginBottom: 60, dialogues: [{ id: 'd3', text: '你、你是——！' }], modifiedAt: 1718779380000 },
        { panelId: 'p5', order: 4, marginTop: 60, marginBottom: 200, dialogues: [{ id: 'd2', text: '好久不见。' }], modifiedAt: 1718779440000 }
      ]
    ]
  },
  {
    id: 'work-002',
    taskId: 'task-002',
    taskTitle: '恋爱心动：樱花树下的告白',
    mood: 'romance',
    moodLabel: '恋爱心动',
    studentName: '小红',
    submittedAt: '2026-06-18 16:45',
    status: 'pending',
    usedPanels: 4,
    finalLayout: [
      { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 60, dialogues: [], modifiedAt: 1718694000000 },
      { panelId: 'p2', order: 1, marginTop: 60, marginBottom: 40, dialogues: [{ id: 'd1', text: '那个……其实我一直想跟你说一件事。' }], modifiedAt: 1718694060000 },
      { panelId: 'p3', order: 2, marginTop: 40, marginBottom: 50, dialogues: [{ id: 'd3', text: '我、我喜欢你！' }], modifiedAt: 1718694120000 },
      { panelId: 'p5', order: 3, marginTop: 50, marginBottom: 100, dialogues: [{ id: 'd5', text: '……我也是。' }], modifiedAt: 1718694180000 }
    ],
    layoutHistory: [
      [
        { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 60, dialogues: [], modifiedAt: 1718694000000 },
        { panelId: 'p2', order: 1, marginTop: 60, marginBottom: 40, dialogues: [{ id: 'd1', text: '那个……其实我一直想跟你说一件事。' }], modifiedAt: 1718694060000 },
        { panelId: 'p3', order: 2, marginTop: 40, marginBottom: 50, dialogues: [{ id: 'd3', text: '我、我喜欢你！' }], modifiedAt: 1718694120000 },
        { panelId: 'p5', order: 3, marginTop: 50, marginBottom: 100, dialogues: [{ id: 'd5', text: '……我也是。' }], modifiedAt: 1718694180000 }
      ]
    ]
  },
  {
    id: 'work-003',
    taskId: 'task-003',
    taskTitle: '战斗爆发：剑士的觉悟',
    mood: 'action',
    moodLabel: '战斗爆发',
    studentName: '小华',
    submittedAt: '2026-06-17 09:20',
    status: 'reviewed',
    score: 85,
    teacherComment: '战斗的节奏感做得不错！多格快速切换的处理很有速度感。建议：第4格拔刀和第5格交错之间的留白可以再缩短一些，让动作更连贯。另外第6格结束卡点卡得不错，如果最后能加一点更大的留白余韵会更好。',
    usedPanels: 6,
    finalLayout: [
      { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 40, dialogues: [{ id: 'd1', text: '今天就是你的死期。' }], modifiedAt: 1718595600000 },
      { panelId: 'p2', order: 1, marginTop: 40, marginBottom: 30, dialogues: [{ id: 'd2', text: '那就来试试吧。' }], modifiedAt: 1718595660000 },
      { panelId: 'p3', order: 2, marginTop: 30, marginBottom: 20, dialogues: [], modifiedAt: 1718595720000 },
      { panelId: 'p4', order: 3, marginTop: 20, marginBottom: 15, dialogues: [{ id: 'd5', text: '一斩……决胜负。' }], modifiedAt: 1718595780000 },
      { panelId: 'p5', order: 4, marginTop: 15, marginBottom: 20, dialogues: [{ id: 'd4', text: '（刀剑碰撞声）' }], modifiedAt: 1718595840000 },
      { panelId: 'p6', order: 5, marginTop: 20, marginBottom: 80, dialogues: [], modifiedAt: 1718595900000 }
    ],
    layoutHistory: [
      [
        { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 40, dialogues: [], modifiedAt: 1718595400000 },
        { panelId: 'p2', order: 1, marginTop: 40, marginBottom: 30, dialogues: [], modifiedAt: 1718595460000 },
        { panelId: 'p3', order: 2, marginTop: 30, marginBottom: 20, dialogues: [], modifiedAt: 1718595520000 },
        { panelId: 'p4', order: 3, marginTop: 20, marginBottom: 15, dialogues: [], modifiedAt: 1718595580000 },
        { panelId: 'p5', order: 4, marginTop: 15, marginBottom: 20, dialogues: [], modifiedAt: 1718595640000 },
        { panelId: 'p6', order: 5, marginTop: 20, marginBottom: 80, dialogues: [], modifiedAt: 1718595700000 }
      ],
      [
        { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 40, dialogues: [{ id: 'd1', text: '今天就是你的死期。' }], modifiedAt: 1718595600000 },
        { panelId: 'p2', order: 1, marginTop: 40, marginBottom: 30, dialogues: [{ id: 'd2', text: '那就来试试吧。' }], modifiedAt: 1718595660000 },
        { panelId: 'p3', order: 2, marginTop: 30, marginBottom: 20, dialogues: [], modifiedAt: 1718595720000 },
        { panelId: 'p4', order: 3, marginTop: 20, marginBottom: 15, dialogues: [{ id: 'd5', text: '一斩……决胜负。' }], modifiedAt: 1718595780000 },
        { panelId: 'p5', order: 4, marginTop: 15, marginBottom: 20, dialogues: [{ id: 'd4', text: '（刀剑碰撞声）' }], modifiedAt: 1718595840000 },
        { panelId: 'p6', order: 5, marginTop: 20, marginBottom: 80, dialogues: [], modifiedAt: 1718595900000 }
      ]
    ]
  },
  {
    id: 'work-004',
    taskId: 'task-004',
    taskTitle: '悬疑铺垫：消失的第五层',
    mood: 'suspense',
    moodLabel: '悬疑铺垫',
    studentName: '小李',
    submittedAt: '2026-06-16 20:10',
    status: 'pending',
    usedPanels: 4,
    finalLayout: [
      { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 50, dialogues: [], modifiedAt: 1718535600000 },
      { panelId: 'p2', order: 1, marginTop: 50, marginBottom: 40, dialogues: [{ id: 'd1', text: '说起来，这栋楼好像……没有五楼？' }], modifiedAt: 1718535660000 },
      { panelId: 'p3', order: 2, marginTop: 40, marginBottom: 60, dialogues: [{ id: 'd3', text: '是、是吗……' }], modifiedAt: 1718535720000 },
      { panelId: 'p4', order: 3, marginTop: 60, marginBottom: 120, dialogues: [{ id: 'd4', text: '（咚、咚、咚——）' }], modifiedAt: 1718535780000 }
    ],
    layoutHistory: [
      [
        { panelId: 'p1', order: 0, marginTop: 0, marginBottom: 50, dialogues: [], modifiedAt: 1718535600000 },
        { panelId: 'p2', order: 1, marginTop: 50, marginBottom: 40, dialogues: [{ id: 'd1', text: '说起来，这栋楼好像……没有五楼？' }], modifiedAt: 1718535660000 },
        { panelId: 'p3', order: 2, marginTop: 40, marginBottom: 60, dialogues: [{ id: 'd3', text: '是、是吗……' }], modifiedAt: 1718535720000 },
        { panelId: 'p4', order: 3, marginTop: 60, marginBottom: 120, dialogues: [{ id: 'd4', text: '（咚、咚、咚——）' }], modifiedAt: 1718535780000 }
      ]
    ]
  }
]
