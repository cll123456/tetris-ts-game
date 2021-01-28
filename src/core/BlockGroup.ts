// 小方块的组合类

import { Block } from "./Block";
import { IPoint, TShape } from "./types";

/**
 * 这个类的作用就是为了组合方块的
 */
export class BlockGroup {
  /**
   * 小方块组合的数组，由多个小方块组成
   */
  private _BlockArr: readonly Block[];
  /**
   * 默认顺时针
   */
  protected isClocked: boolean = true;
  public constructor(
    private _shape: TShape, // 小方块的形状,由点组成的
    private _centerPointer: IPoint, // 小方块的中心的坐标
    private _color: string, // 小方块的颜色
  ) {
    const arr: Block[] = [];
    this._shape.forEach(s => {
      const block = new Block();
      block.color = this._color;
      block.point = {
        x: s.x + this._centerPointer.x,
        y: s.y + this._centerPointer.y,
      }
      arr.push(block);
    })
    this._BlockArr = arr;
  }
  /**
   * 获取小方块的形状
   */
  public get BlockArr() {
    return this._BlockArr;
  }

  /**
   * 设置中线点的坐标
   */
  public set centerPointer(v: IPoint) {
    this._centerPointer = v;
    this.setBlockPoint();
  }
  /**
   * 设置方块的坐标
   */
  private setBlockPoint() {
    this.BlockArr.forEach((s, i) => {
      this.BlockArr[i].point = {
        // 这里需要使用原来的形状的值，千万不能使用当前组合图形的坐标点进行变化
        x: this.shape[i].x + this.centerPointer.x,
        y: this.shape[i].y + this.centerPointer.y,
      }
    })
  }

  /**
   * 获取组成方块中心点的坐标
   */
  public get centerPointer() {
    return this._centerPointer
  }


  /**
   * 获取形状
   */
  public get shape() {
    return this._shape
  }

  /**
   * 获取旋转后的形状坐标
   * 
   * 顺序针旋转 如
   *  c         a
   * ab   ->   dbc    坐标的变化 a(-1, 0) -> a(0 ,-1) b(0, 0) -> b(0, 0)  c(0, -1) -> c(1, 0) d(0, 1) -> d(-1, 0)
   *  d
   * 所以得出顺时针旋转的规律： (x, y) -> (-y, x)
   * 
   * 逆时针旋转，如
   *  a       c
   * dbc ->  ab     坐标变化 a(0 ,-1) -> a(-1, 0) b(0, 0) -> b(0, 0)  c(1, 0) -> c(0, -1) d(-1, 0) -> d(0, 1)
   *          d
   * 逆时针的规律如下： （x, y） -> (y, -x)
   * 
   */
  public getRoateShape(): TShape {
    if (this.isClocked) {
      // 顺时针旋转
      return this.shape.map(p => {
        return {
          x: -p.y,
          y: p.x
        }
      })
    } else {
      // 逆时针旋转
      return this.shape.map(p => {
        return {
          x: p.y,
          y: -p.x
        }
      })
    }
  }
  /**
   * 旋转方块
   */
  public roateBlock() {
    this._shape = this.getRoateShape();
    // 旋转后，设置每一个方块
    this.setBlockPoint();
  }

}