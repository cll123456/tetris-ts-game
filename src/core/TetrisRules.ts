/**
 * 俄罗斯方块的规则类
 */

import { BlockGroup } from "./BlockGroup";
import { LogicConfig } from "./config/LogicConfig";
import { EDirection, IPoint } from "./types";
/**
 * 判断是否为一个坐标，使用自定义的类型保护
 * @param obj 
 */
function isPoint(obj: any): obj is IPoint {
  if (typeof obj.x === 'undefined') {
    return false;
  } else {
    return true;
  }
}

export class TetrisRules {
  /**
   * 检测目标位置是否可以移动
   * @param tetrisBlock 
   * @param targetPoint 
   */
  static isMove(tetrisBlock: BlockGroup, targetPoint: IPoint) {
    const targetBlockPoint: IPoint[] = tetrisBlock.shape.map(it => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y
      }
    })
    // 这里减1 是 因为长度逻辑长度和矿都都是从0开始的
    const r = targetBlockPoint.some(s => (s.x < 0 || s.x > LogicConfig.PanelSize.width - 1 || s.y < 0 || s.y > LogicConfig.PanelSize.height - 1));

    return !r;
  }
  /**
   * 通过目标位置来进行移动
   * @param tetrisBlock 
   * @param targetPointOrDirection 
   */
  static move(tetrisBlock: BlockGroup, targetPointOrDirection: IPoint): boolean;
  /**
   * 通过方向来进行移动
   * @param tetrisBlock 
   * @param targetPointOrDirection 
   */
  static move(tetrisBlock: BlockGroup, targetPointOrDirection: EDirection): boolean;
  /**
   * 移动的方法，方法重载
   * @param tetrisBlock 
   * @param targetPointOrDirection 
   */
  static move(tetrisBlock: BlockGroup, targetPointOrDirection: IPoint | EDirection): boolean {
    if (isPoint(targetPointOrDirection)) {
      // 通过目标点来进行移动的
      if (this.isMove(tetrisBlock, targetPointOrDirection)) {
        tetrisBlock.centerPointer = targetPointOrDirection;
        return true;
      }
      return false;
    } else {
      let movePoint: IPoint;
      // 这里是通过方向来进行移动
      if (targetPointOrDirection === EDirection.down) {
        // 向下移动
        movePoint = {
          x: tetrisBlock.centerPointer.x,
          y: tetrisBlock.centerPointer.y + 1
        }
      } else if (targetPointOrDirection === EDirection.left) {
        // 向左移动
        movePoint = {
          x: tetrisBlock.centerPointer.x - 1,
          y: tetrisBlock.centerPointer.y
        }
      } else {
        // 向右移动
        movePoint = {
          x: tetrisBlock.centerPointer.x + 1,
          y: tetrisBlock.centerPointer.y
        }
      }
      return this.move(tetrisBlock, movePoint);
    }
  }
  /**
   * 在一个方向上到底
   * @param tetrisBlock 
   * @param direction 
   */
  static moveDirectly(tetrisBlock: BlockGroup, direction: EDirection) {
    while (this.move(tetrisBlock, direction)) { }
  }
}