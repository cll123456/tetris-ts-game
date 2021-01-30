/**
 * 俄罗斯方块的规则类
 */

import { Block } from "./Block";
import { BlockGroup } from "./BlockGroup";
import { EDirection, IPoint, TShape } from "./types";
import PageShowerConfig from "./viewer/PageShowerConfig";
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
   * @param shape 移动的图形
   * @param targetPoint 
   * @param exitsBlock 
   */
  static isMove(shape: TShape, targetPoint: IPoint, exitsBlock: Block[]) {
    const targetBlockPoint: IPoint[] = shape.map(it => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y
      }
    })
    // 这里减1 是 因为长度逻辑长度和矿都都是从0开始的
    let r = targetBlockPoint.some(s => (s.x < 0 || s.x > PageShowerConfig.blockPaneSize.width - 1 || s.y < 0 || s.y > PageShowerConfig.blockPaneSize.height - 1));
    if(r){
      return false;
    }


    // 判断当前存在的的方块中，是否包含目标方块的点
   r = targetBlockPoint.some(tb => exitsBlock.some(eb => eb.point.x === tb.x && eb.point.y === tb.y))
    if(r){
      return false;
    }
    return true;
  }
  /**
   * 通过目标位置来进行移动
   * @param tetrisBlock 
   * @param targetPointOrDirection 
   * @param existBlock 
   */
  static move(tetrisBlock: BlockGroup, targetPointOrDirection: IPoint, existBlock: Block[]): boolean;
  /**
   * 通过方向来进行移动
   * @param tetrisBlock 
   * @param targetPointOrDirection 
   * @param existBlock 
   */
  static move(tetrisBlock: BlockGroup, targetPointOrDirection: EDirection,  existBlock: Block[]): boolean;
  /**
   * 移动的方法，方法重载
   * @param tetrisBlock 
   * @param targetPointOrDirection 
   * @param existBlock 
   */
  static move(tetrisBlock: BlockGroup, targetPointOrDirection: IPoint | EDirection, existBlock: Block[]): boolean {
    if (isPoint(targetPointOrDirection)) {
      // 通过目标点来进行移动的
      if (this.isMove(tetrisBlock.shape, targetPointOrDirection,existBlock)) {
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
      return this.move(tetrisBlock, movePoint, existBlock);
    }
  }
  /**
   * 在一个方向上到底
   * @param tetrisBlock 
   * @param direction 
   * @param existBlock 
   */
  static moveDirectly(tetrisBlock: BlockGroup, direction: EDirection, existBlock: Block[]) {
    while (this.move(tetrisBlock, direction,existBlock)) { }
  }
  /**
   * 方块旋转的规则
   * @param tetrisBlock 
   * @param existBlock 
   */
  static rotate(tetrisBlock: BlockGroup, existBlock: Block[]) {
    // 获取旋转后的每个方块的位置
    const shapePoint = tetrisBlock.getRotateShape();
    if (this.isMove(shapePoint, tetrisBlock.centerPointer,existBlock)) {
      tetrisBlock.rotateBlock();
      return true;
    } else {
      return false;
    }
  }

  // 需要进行消除处理,
  static removeBlock(blocks:Block[]):number{
    // 获取里面有几行
    const ys = blocks.map( bk => bk.point.y)
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys);
    let num = 0;
    for(let y = minY; y <= maxY; y++){
      // 判断传入的行是否占满整行
     const blockNum = blocks.filter(bk => bk.point.y === y);
     if(blockNum.length > 0&& blockNum.length === PageShowerConfig.blockPaneSize.width){
       // 消除当前行
       this.removeBlockByLine(blocks, y);
       num ++;
     }
    }
    return num
  }

  /**
   * t通过指定的行来消除方块
   * @param blocks 
   * @param y 
   */
  static removeBlockByLine(blocks:Block[], y:number){
    // 先把页面上的给消除掉，然后把数组中的也给消除掉
    // 消除页面中的
    blocks.filter(bk => bk.point.y === y).forEach(bk => {
      if(bk.shower){
        bk.shower.remove()
      }
      // 移除数组中的
      const index = blocks.indexOf(bk);
      blocks.splice(index, 1)
    })
    // 从小的地方开始消除，其他比当前小的需要加1
    blocks.filter(bk => bk.point.y < y).forEach(bk => {
     bk.point = {
       x: bk.point.x,
       y: bk.point.y + 1
     }
    })
  }
}