import { TaskTemplate } from '@/types/comic'

export const mockTasks: TaskTemplate[] = [
  {
    id: 'task-001',
    title: '悬疑铺垫：雨夜来访者',
    description: '通过镜头节奏和留白营造悬疑氛围，注意最后一格的卡点效果',
    mood: 'suspense',
    moodLabel: '悬疑铺垫',
    difficulty: 3,
    requiredPanels: 5,
    endingCardPoint: true,
    teacherName: '李老师',
    deadline: '2026-06-25',
    tips: [
      '前3格留白可以稍大，营造等待的紧张感',
      '关键镜头前的留白要足够，让读者有心理准备',
      '对白不要盖过人物表情的传达'
    ],
    panels: [
      { id: 'p1', imageUrl: 'https://picsum.photos/id/1015/600/400', width: 600, height: 400, description: '空荡的街道，雨幕中的路灯' },
      { id: 'p2', imageUrl: 'https://picsum.photos/id/1018/600/350', width: 600, height: 350, description: '房门把手缓缓转动的特写' },
      { id: 'p3', imageUrl: 'https://picsum.photos/id/1036/600/500', width: 600, height: 500, description: '门口站着看不清脸的黑影' },
      { id: 'p4', imageUrl: 'https://picsum.photos/id/1039/600/300', width: 600, height: 300, description: '主角震惊的面部表情特写' },
      { id: 'p5', imageUrl: 'https://picsum.photos/id/1044/600/450', width: 600, height: 450, description: '来人缓缓抬起头，露出意味深长的笑' },
      { id: 'p6', imageUrl: 'https://picsum.photos/id/1025/600/380', width: 600, height: 380, description: '窗外闪电照亮房间' },
      { id: 'p7', imageUrl: 'https://picsum.photos/id/1062/600/420', width: 600, height: 420, description: '桌上的茶杯轻微颤动' }
    ],
    dialogues: [
      { id: 'd1', text: '……这么晚了，会是谁？' },
      { id: 'd2', text: '好久不见。' },
      { id: 'd3', text: '你、你是——！' },
      { id: 'd4', text: '（雨声）' },
      { id: 'd5', text: '我今天来，是有件事想拜托你。' }
    ]
  },
  {
    id: 'task-002',
    title: '恋爱心动：樱花树下的告白',
    description: '用细腻的镜头语言表现心动瞬间，注意节奏的递进感',
    mood: 'romance',
    moodLabel: '恋爱心动',
    difficulty: 2,
    requiredPanels: 4,
    endingCardPoint: false,
    teacherName: '王老师',
    deadline: '2026-06-28',
    tips: [
      '重要镜头可以适当加大高度占比',
      '心跳感可以通过紧凑的小格 + 大格特写来表现',
      '对白气泡的位置不要挡住两人的眼神交流'
    ],
    panels: [
      { id: 'p1', imageUrl: 'https://picsum.photos/id/1025/600/400', width: 600, height: 400, description: '樱花树下，两人并肩站立的远景' },
      { id: 'p2', imageUrl: 'https://picsum.photos/id/1062/600/350', width: 600, height: 350, description: '男生紧张握拳的手部特写' },
      { id: 'p3', imageUrl: 'https://picsum.photos/id/177/600/500', width: 600, height: 500, description: '男生脸红着抬头说话的侧脸' },
      { id: 'p4', imageUrl: 'https://picsum.photos/id/64/600/450', width: 600, height: 450, description: '女生惊讶的表情，花瓣飘落' },
      { id: 'p5', imageUrl: 'https://picsum.photos/id/338/600/550', width: 600, height: 550, description: '两人眼神交汇的瞬间' },
      { id: 'p6', imageUrl: 'https://picsum.photos/id/1027/600/400', width: 600, height: 400, description: '女生低头微笑，发丝被风吹动' }
    ],
    dialogues: [
      { id: 'd1', text: '那个……其实我一直想跟你说一件事。' },
      { id: 'd2', text: '嗯？什么事？' },
      { id: 'd3', text: '我、我喜欢你！' },
      { id: 'd4', text: '（心跳声）' },
      { id: 'd5', text: '……我也是。' }
    ]
  },
  {
    id: 'task-003',
    title: '战斗爆发：剑士的觉悟',
    description: '用速度线和镜头切换表现战斗的张力，节奏要快',
    mood: 'action',
    moodLabel: '战斗爆发',
    difficulty: 4,
    requiredPanels: 6,
    endingCardPoint: true,
    teacherName: '张老师',
    deadline: '2026-07-01',
    tips: [
      '开场可以用大格交代场景，然后快速切小格加快节奏',
      '出剑的关键格要留白大一些，制造出招前的停顿',
      '速度感可以通过多格连续变化来体现'
    ],
    panels: [
      { id: 'p1', imageUrl: 'https://picsum.photos/id/1080/600/500', width: 600, height: 500, description: '古战场废墟中，两人对峙的全景' },
      { id: 'p2', imageUrl: 'https://picsum.photos/id/292/600/300', width: 600, height: 300, description: '剑士紧握剑柄的手，青筋暴起' },
      { id: 'p3', imageUrl: 'https://picsum.photos/id/312/600/250', width: 600, height: 250, description: '敌方眼神一凛' },
      { id: 'p4', imageUrl: 'https://picsum.photos/id/326/600/350', width: 600, height: 350, description: '剑士拔刀瞬间，刀光闪烁' },
      { id: 'p5', imageUrl: 'https://picsum.photos/id/401/600/200', width: 600, height: 200, description: '两道身影交错而过，速度线' },
      { id: 'p6', imageUrl: 'https://picsum.photos/id/431/600/450', width: 600, height: 450, description: '剑士收刀的背影，身后敌人缓缓倒下' },
      { id: 'p7', imageUrl: 'https://picsum.photos/id/570/600/400', width: 600, height: 400, description: '风吹起剑士的披风，特写' },
      { id: 'p8', imageUrl: 'https://picsum.photos/id/580/600/350', width: 600, height: 350, description: '地上飘落的断发' }
    ],
    dialogues: [
      { id: 'd1', text: '今天就是你的死期。' },
      { id: 'd2', text: '那就来试试吧。' },
      { id: 'd3', text: '——！！' },
      { id: 'd4', text: '（刀剑碰撞声）' },
      { id: 'd5', text: '一斩……决胜负。' },
      { id: 'd6', text: '（风声）' }
    ]
  },
  {
    id: 'task-004',
    title: '悬疑铺垫：消失的第五层',
    description: '日常场景中渗透不安感，注意信息的逐步揭示',
    mood: 'suspense',
    moodLabel: '悬疑铺垫',
    difficulty: 2,
    requiredPanels: 4,
    endingCardPoint: false,
    teacherName: '李老师',
    tips: [
      '日常镜头和异常信息穿插出现',
      '最后一格揭示的信息要有冲击力',
      '留白控制好节奏，不要太急也不要太慢'
    ],
    panels: [
      { id: 'p1', imageUrl: 'https://picsum.photos/id/1082/600/400', width: 600, height: 400, description: '老旧公寓楼外观，看起来很平常' },
      { id: 'p2', imageUrl: 'https://picsum.photos/id/787/600/350', width: 600, height: 350, description: '电梯面板特写：1、2、3、4、6……' },
      { id: 'p3', imageUrl: 'https://picsum.photos/id/1025/600/380', width: 600, height: 380, description: '主角疑惑的表情，看着电梯面板' },
      { id: 'p4', imageUrl: 'https://picsum.photos/id/1062/600/450', width: 600, height: 450, description: '楼梯间，4楼上去的台阶被封死，墙上写着"不要上去"' },
      { id: 'p5', imageUrl: 'https://picsum.photos/id/177/600/400', width: 600, height: 400, description: '深夜，楼道传来脚步声' }
    ],
    dialogues: [
      { id: 'd1', text: '说起来，这栋楼好像……没有五楼？' },
      { id: 'd2', text: '你刚来不知道，这栋楼一直就没有五楼啦。' },
      { id: 'd3', text: '是、是吗……' },
      { id: 'd4', text: '（咚、咚、咚——）' },
      { id: 'd5', text: '那声音……是从楼上传来的？' }
    ]
  },
  {
    id: 'task-005',
    title: '恋爱心动：图书馆的偶遇',
    description: '日常感的心动场景，用细节打动人',
    mood: 'romance',
    moodLabel: '恋爱心动',
    difficulty: 1,
    requiredPanels: 4,
    endingCardPoint: false,
    teacherName: '王老师',
    tips: [
      '两人视线交汇的节奏要控制好',
      '手部、眼神等细节特写很重要',
      '留白不宜太大，保持日常的轻松感'
    ],
    panels: [
      { id: 'p1', imageUrl: 'https://picsum.photos/id/1036/600/400', width: 600, height: 400, description: '图书馆书架间，阳光洒下的光斑' },
      { id: 'p2', imageUrl: 'https://picsum.photos/id/1039/600/350', width: 600, height: 350, description: '两人同时伸手去拿同一本书' },
      { id: 'p3', imageUrl: 'https://picsum.photos/id/1015/600/380', width: 600, height: 380, description: '手碰到一起的瞬间，特写' },
      { id: 'p4', imageUrl: 'https://picsum.photos/id/64/600/450', width: 600, height: 450, description: '两人同时抬头，四目相对' },
      { id: 'p5', imageUrl: 'https://picsum.photos/id/338/600/400', width: 600, height: 400, description: '女生害羞地移开视线，耳朵发红' }
    ],
    dialogues: [
      { id: 'd1', text: '啊……' },
      { id: 'd2', text: '你先、你先拿吧。' },
      { id: 'd3', text: '没、没关系，你先……' },
      { id: 'd4', text: '……' },
      { id: 'd5', text: '（心跳）' }
    ]
  }
]
