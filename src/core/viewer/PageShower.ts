import { IShower } from "../types";
import $ from 'jquery'
import { Block } from "../Block";
import PageShowerConfig from "./PageShowerConfig";
export class PageShower implements IShower {
  /**
   * 当前操作的方块dom
   */
  private _dom?: JQuery<HTMLElement>;
  /**
   * 是否被移除
   */
  private _isRemove: boolean = false;
  public constructor(
    private container: JQuery<HTMLElement>, // 用来装显示者的容器
    private block: Block, // 用于显示的方块
  ) { }
  /**
   * 显示方块
   */
  show(): void {
    if (!this._dom) {
      // dom 不存在，重新创建
      this._dom = $('<div/>').css({
        height: PageShowerConfig.BlockSize.height,
        width: PageShowerConfig.BlockSize.width,
        position: 'absolute',
        border: PageShowerConfig.BlockBorder,
        boxSizing: 'border-box'
      }).appendTo(this.container)
    }
    // 存在后的赋值
    this._dom.css({
      left: PageShowerConfig.BlockSize.width * this.block.point.x,
      top: PageShowerConfig.BlockSize.height * this.block.point.y,
      background: this.block.color
    })
  }
  /**
   * 移除方块
   */
  remove(): void {
    if (this._dom && !this.isRemove) {
      this._dom.remove();
      this.isRemove = true;
    }
  }
  /**
   * 获取是否移除
   */
  public get isRemove() {
    return this._isRemove;
  }
  /**
   * 设置移除
   */
  public set isRemove(v) {
    this._isRemove = v;
  }

}