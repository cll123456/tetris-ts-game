/**\
 * 配置项目核心的配置选项
 */
export default {
   /**
   * 显示下一个方块的容器大小
   */
  nextPanelSize:{
    width: 6,
    height: 3
  },
  /**
   * 方块容器大小
   */
  blockPaneSize:{
    width: 12,
    height: 20,
  },
  /**
   * 游戏分数的规则
   * 消除一行加10分
   * 消除2行加35分
   * 消除3行加70分
   * 消除4行加100分， 最多同时消除4行
   */
  scoreRules:[
    {
      num: 1,
      scores: 10
    },
    {
      num: 2,
      scores: 25
    },
    {
      num: 3,
      scores: 50
    },
    {
      num: 4,
      scores: 100
    },
  ],
  /**
   * 游戏等级
   */
  gameLevel:[
    {
      scores: 0,
      duration: 1500,
    },
    {
      scores: 200,
      duration: 1000
    },
    {
      scores: 500,
      duration: 800
    },
    {
      scores: 1000,
      duration: 600
    },{
      scores: 2000,
      duration: 500
    },
    {
      scores: 5000,
      duration: 300
    }
  ]
}