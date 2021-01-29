// 公共的类型

import { BlockGroup } from "./BlockGroup";

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
/**
 * 方块移动的方块
 */
export enum EDirection {
  /**
   * 向下移动
   */
  down,
  /**
   * 向左边移动
   */
  left,
  /**
   * 向右边移动
   */
  right,
}
/**
 * 游戏的枚举状态
 */
export enum EGameStatus {
  /**
   * 游戏初始化，还未开始
   */
  init,
  /**
   * 游戏进行中
   */
  playing,
  /**
   * 游戏暂停
   */
  pause,
  /**
   * 游戏结束
   */
  over
}

/**
 * 游戏类的显示接口
 */
export interface IGameViewer{
  /**
   * 显示下一个方块
   * @param tetris x
   */
  showNext(tetris: BlockGroup) : void;

  /**
   * 切换方块
   * @param tetris 
   */
  switchBlock(tetris: BlockGroup): void;
}