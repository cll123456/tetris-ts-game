/**
 * 俄罗斯方块工厂
 */

import { BlockGroup } from "./BlockGroup";
import { IPoint, TShape } from "./types";
import { getRandom } from "./util/utils";
/**
 * L形方块
 *   b
 * bbb [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }]
 */
export class LShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPointer, _color)
  }
}

/**
 * L反向形状
 * b
 * bbb  [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]
 */
export class LMirrorShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPointer, _color)
  }
};


/**
 * 倒T形状
 *  b
 * bbb [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }]
 *     
 */
export class TInvertedShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPointer, _color)
  }
}
/**
 * S形状
 *  bb
 * bb  [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
 */
export class SShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }], _centerPointer, _color)
  }
  /**
   * 重写父类旋转方法，只能左右旋转
   */
  rotateBlock() {
    super.rotateBlock();
    this.isClocked = !this.isClocked;
  }
}
/**
 * 倒S形状
 * bb
 *  bb [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }]
 */
export class SMirrorShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], _centerPointer, _color)
  }
  /**
   * 重写父类旋转方法，只能左右旋转
   */
  rotateBlock() {
    super.rotateBlock();
    this.isClocked = !this.isClocked;
  }
}
/**
 * 田字性转
 * bb
 * bb [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }]
 */
export class SquareShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], _centerPointer, _color)
  }
  /**
   * 田字的不能旋转，重写父类方法，获取原来的旋转的图形
   */
  getRotateShape(): TShape {
    return this.shape;
  }
}
/**
 * 一字型
 * bbbb [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]
 */
export class LineShape extends BlockGroup {
  constructor(_centerPointer: IPoint, _color: string) {
    super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPointer, _color)
  }
  /**
 * 重写父类旋转方法，只能左右旋转
 */
  rotateBlock() {
    super.rotateBlock();
    this.isClocked = !this.isClocked;
  }
};

/**
 * 颜色数组
 */
export const colors = [
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
]

/**
 * 俄罗斯方块工厂类
 */
export class TetrisFactory {
  static shapeArr = [LShape, LMirrorShape, TInvertedShape, SShape, SMirrorShape, SquareShape, LineShape]
  /**
   * 对外提供一个获取俄罗斯方块的静态方法
   * @param centerPointer 中心点的位置
   */
  static getTetrisBlock(centerPointer: IPoint) {
    const shapeIndex = getRandom(0, this.shapeArr.length);
    const colorIndex = getRandom(0, colors.length);
    return new this.shapeArr[shapeIndex](centerPointer, colors[colorIndex])
  }
}