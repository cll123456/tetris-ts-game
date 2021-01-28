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
    // 设置中心点的坐标后，其他的坐标也要相应的改变
    this.BlockArr.forEach((s, i) => {
      this.BlockArr[i].point = {
        // 这里需要使用原来的形状的值，千万不能使用当前组合图形的坐标点进行变化
        x: this.shape[i].x + v.x,
        y: this.shape[i].y + v.y,
      }
    })
    this._centerPointer = v;

  }

  /**
   * 获取组成方块中心点的坐标
   */
  public get centerPointer() {
    return this._centerPointer
  }

  /**
   * 设置中心点
   */
  public set shape(v: IPoint[]) {
    this._shape = v;
  }

  /**
   * 获取中心点
   */
  public get shape() {
    return this._shape
  }


}