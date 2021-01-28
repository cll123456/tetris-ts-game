/**
 * 俄罗斯方块工厂
 */

import { BlockGroup } from "./BlockGroup";
import { IPoint, TShape } from "./types";
import { getRandom } from "./util/utils";
/**
 * L形方块
 *   b
 * bbb
 */
export const LShape: TShape = [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }];

/**
 * L反向形状
 * b
 * bbb
 */
export const LMirrorShape: TShape = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];


/**
 * 倒T形状
 *  b
 * bbb
 */
export const TInvertedShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
/**
 * S形状
 *  bb
 * bb
 */
export const SShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
/**
 * 倒S形状
 * bb
 *  bb
 */
export const SMirrorShape: TShape = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }];
/**
 * 田字性转
 * bb
 * bb
 */
export const SquareShape: TShape = [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }];
/**
 * 一字型
 * bbbb
 */
export const LineShape: TShape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];

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
  static shapeArr: readonly TShape[] = [LShape, LMirrorShape, TInvertedShape, SShape, SMirrorShape, SquareShape, LineShape]
  /**
   * 对外提供一个获取俄罗斯方块的静态方法
   * @param centerPointer 中心点的位置
   */
  static getTetrisBlock(centerPointer: IPoint) {
    const shapeIndex = getRandom(0, this.shapeArr.length);
    const colorIndex = getRandom(0, colors.length);
    return new BlockGroup(this.shapeArr[shapeIndex], centerPointer, colors[colorIndex]);
  }
}