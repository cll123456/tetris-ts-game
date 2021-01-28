// 公共的类型

/**
 * 逻辑的点的位置
 */
export interface IPoint {
  /**
   * 逻辑横坐标
   */
  readonly x: number
  /**
   * 逻辑纵坐标
   */
  readonly y: number
}

/**
 * 方块显示者的接口
 */
export interface IShower {
  /**
   * 方块显示的方法
   */
  show(): void
  /**
   * 方块移除的方法
   */
  remove(): void
}

/**
 * 小方块的形状，是由点的坐标组成的
 */
export type TShape = IPoint[]