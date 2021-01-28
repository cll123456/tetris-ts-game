// 俄罗斯里面的小方块的类

import { IPoint, IShower } from "./types";

export class Block {
  /**
   * 方块显示者
   */
  private _shower?: IShower;
  // 每一个小方块都有一个坐标,颜色
  private _point: IPoint = {
    x: 0,
    y: 0
  }
  private _color: string = '';

  // 每一个类都尽量满足，属性私有化，对外提供公共的方法来操作
  /**
   * 设置坐标
   */
  public set point(val: IPoint) {
    this._point = val;
    // 坐标改变，需要调用显示者
    if (this._shower) {
      this._shower.show();
    }
  }
  /**
   * 获取坐标
   */
  public get point() {
    return this._point;
  }
  /**
   * 获取颜色
   */
  public get color() {
    return this._color;
  }
  /**
   * 设置颜色
   */
  public set color(val) {
    this._color = val;
  }
  /**
   * 设置显示者
   */
  public set shower(val) {
    this._shower = val;
    if (this._shower) {
      this._shower.show();
    }
  }
  /**
   * 设置显示者
   */
  public get shower() {
    return this._shower;
  }
}