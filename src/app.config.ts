export default defineAppConfig({
  pages: [
    'pages/tasks/index',
    'pages/editor/index',
    'pages/mywork/index',
    'pages/reviews/index',
    'pages/taskDetail/index',
    'pages/workDetail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '漫格练习',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFF8F3'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/tasks/index',
        text: '作业广场'
      },
      {
        pagePath: 'pages/editor/index',
        text: '排版工作台'
      },
      {
        pagePath: 'pages/mywork/index',
        text: '我的作业'
      },
      {
        pagePath: 'pages/reviews/index',
        text: '点评中心'
      }
    ]
  }
})
